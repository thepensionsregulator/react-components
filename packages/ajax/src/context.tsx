import React, {
	createContext,
	useContext,
	useMemo,
	useEffect,
	useCallback,
} from 'react';
import StoreProvider from '@alekna/react-store';
import { createStore, useStoreContext } from '@alekna/react-store';
import { removeItemFromStorage, storeItem } from './localStorage';
import reducer from './reducer';
import { of, iif, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import {
	shareReplay,
	debounceTime,
	switchMap,
	mergeMap,
	tap,
	mergeMapTo,
	distinctUntilChanged,
	withLatestFrom,
	throttleTime,
	scan,
} from 'rxjs/operators';

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

	const sharedApi = useCallback(
		dispatch =>
			api.map(({ instance, ...apiSettings }) => {
				/** Share reply with late subscribers without sending multiple network requests,
				 * instead send latest value received from network. Otherwise make a new request */
				return {
					...apiSettings,
					instance: params => {
						/** NOTE: this is a new observable every time function is called. */
						return of(params).pipe(
							mergeMap(settings => instance({ dispatch, ...settings })),
							shareReplay(1),
						);
					},
				};
			}),
		[api],
	);

	const clearStore = () => removeItemFromStorage(persistOn);

	return (
		<StoreProvider store={storeConfig}>
			{({ dispatch }) => (
				<AjaxContext.Provider value={{ api: sharedApi(dispatch), clearStore }}>
					<Persister persist={persist} persistOn={persistOn}>
						{children}
					</Persister>
				</AjaxContext.Provider>
			)}
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
