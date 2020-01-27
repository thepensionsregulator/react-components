import React, { createContext, useContext, useMemo } from 'react';
import StoreProvider, {
	createStore,
	useStoreContext,
} from '@alekna/react-store';
import { throttleTime, tap } from 'rxjs/operators';
import reducer from './reducer';

// NOTE: consider SSR

// What is the point of having global fetched data context?
// 1. can help with caching and
// 2. accessing same data in other components
// 3. refetching from stored variables that were initially used to fetch data | doesnt require global state though, could use xstate

type Endpoint = { name: string; instance: Function };
type AjaxContextProps = { api: Endpoint[] };

export const AjaxContext = createContext<AjaxContextProps>({
	api: [],
});

type Store = {
	name: string;
	persist?: boolean;
};

interface AjaxProviderProps extends AjaxContextProps {
	stores: Store[];
	/** Use initialState to re-hidrate the store from localStorage */
	initialState?: any;
	persistKey?: string;
}

const storeItem = (key: string, item: any) => {
	if (!localStorage) return;

	try {
		return localStorage.setItem(key, JSON.stringify(item));
	} catch (err) {
		console.error(`Error storing item ${key} to localStoragee`, err);
	}
};

type PersisterProps = {
	children: any;
	persist: string[];
	persistKey: string;
};

/** Persister will continually persist selected state in localStorage */
const Persister = ({ children, persist = [], persistKey }: PersisterProps) => {
	const { stateChanges } = useStoreContext();

	// TODO: check if it affects page rerenders on state changes.
	if (persist.length > 0) {
		stateChanges()
			.pipe(
				throttleTime(1000),
				tap(state =>
					storeItem(
						persistKey,
						persist.reduce((acc, k) => {
							const value = state[k];
							return {
								...acc,
								[k]: value,
							};
						}, {}),
					),
				),
			)
			.subscribe();
	}

	return children;
};

export const AjaxProvider: React.FC<AjaxProviderProps> = ({
	api,
	stores,
	initialState = undefined,
	persistKey = 'tpr',
	children,
}) => {
	const persist = stores
		.map(({ name, persist }) => persist && name)
		.filter(Boolean);
	const storeConfig = useMemo(() => {
		return createStore(
			stores.reduce((acc, { name }) => ({ ...acc, [name]: reducer(name) }), {}),
			initialState,
		);
	}, [stores]);

	return (
		<StoreProvider store={storeConfig}>
			<AjaxContext.Provider value={{ api }}>
				<Persister persist={persist} persistKey={persistKey}>
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
