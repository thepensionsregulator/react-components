import React, { createContext, useContext, useMemo, useEffect } from 'react';
import StoreProvider, {
	createStore,
	useStoreContext,
} from '@alekna/react-store';
import {
	mergeMapTo,
	shareReplay,
	debounceTime,
	switchMap,
	tap,
	mergeMap,
	distinctUntilChanged,
	finalize,
	startWith,
} from 'rxjs/operators';
import reducer from './reducer';
import { of, iif, BehaviorSubject, AsyncSubject } from 'rxjs';
import { removeItemFromStorage, storeItem } from './localStorage';
import { isEqual } from 'lodash';

// What is the point of having global fetched data context?
// 1. can help with caching and
// 2. accessing same data in other components
// 3. refetching from stored variables that were initially used to fetch data | doesnt require global state though, could use xstate

type Endpoint = { name: string; instance: Function };
type AjaxContextProps = { api: Endpoint[]; clearStore: () => void };

export const AjaxContext = createContext<AjaxContextProps>({
	api: [],
	clearStore: () => null,
});

type Store = {
	name: string;
	persist?: boolean;
};

interface AjaxProviderProps {
	api: Endpoint[];
	stores: Store[];
	/** Use initialState to re-hidrate the store from localStorage */
	initialState?: any;
	persistOn?: string;
}

type PersisterProps = {
	children: any;
	persist: string[];
	persistOn: string;
};

/** Persister will continually persist selected state in localStorage */
const Persister = ({ children, persist = [], persistOn }: PersisterProps) => {
	const { stateChanges } = useStoreContext();

	useEffect(() => {
		function persistStores(state: { [key: string]: any }) {
			storeItem(
				persistOn,
				persist.reduce((acc, store) => {
					const value = state[store];
					return {
						...acc,
						[store]: value,
					};
				}, {}),
			);
		}

		const sub = stateChanges()
			.pipe(
				switchMap(v => iif(() => persist.length > 0, of(v))),
				debounceTime(1000),
			)
			.subscribe(persistStores);

		return () => {
			sub.unsubscribe();
		};
	}, [stateChanges, persist.length, persistOn]);

	return children;
};

export const AjaxProvider: React.FC<AjaxProviderProps> = ({
	api,
	stores,
	initialState = undefined,
	persistOn = 'store',
	children,
}) => {
	const persist = useMemo(
		() => stores.map(({ name, persist }) => persist && name).filter(Boolean),
		[stores],
	);
	const storeConfig = useMemo(() => {
		return createStore(
			stores.reduce((acc, { name }) => ({ ...acc, [name]: reducer(name) }), {}),
			initialState,
		);
	}, [stores]);

	const sharedApi = useMemo(() => {
		/** share reply with late subscribers without sending multiple network requests.
		 * Instead send latest value received from network within 10s. Otherwise make
		 * a new request.
		 */

		return api.map(({ instance, ...apiSettings }) => {
			console.log('INIT INSTANCE');

			// TODO: should make a single instance for react hooks that refer to this.
			// then we should filter out same requests so that only 1 call is made
			// to the server

			// const inst$ = of({}).pipe(tap(console.log));
			const inst$ = of().pipe(tap(console.log));

			return {
				...apiSettings,
				instance: (...args1) => (...args2) => {
					return inst$.pipe(
						startWith([args1, ...args2]),
						distinctUntilChanged((prev, next) => isEqual(prev[2], next[2])),
						mergeMap(([dispatch, ...args]) => instance(dispatch)(...args)),
						shareReplay(1),
					);
				},
			};
		});
	}, [api]);

	const clearStore = () => removeItemFromStorage(persistOn);

	return (
		<StoreProvider store={storeConfig}>
			<AjaxContext.Provider value={{ api: sharedApi, clearStore }}>
				<Persister persist={persist} persistOn={persistOn}>
					{children}
				</Persister>
			</AjaxContext.Provider>
		</StoreProvider>
	);
};

export const useAjaxContext = () => {
	const ajaxUtils = useContext(AjaxContext);
	const storeUtils = useStoreContext();
	if (!storeUtils) {
		throw new Error(
			`Ajax compound components cannot be rendered outside the AjaxProvider component`,
		);
	}
	return { ...ajaxUtils, ...storeUtils };
};
