import React, { createContext, useContext, useMemo } from 'react';
import StoreProvider, { createStore, useStoreContext } from '@alekna/react-store';
import reducer from 'reducer';
import { Observable } from 'rxjs';
import { throttleTime, tap } from 'rxjs/operators';

// NOTE: consider SSR

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
	initialState: any;
}

const storeItem = (key: string, item: any) => {
	if (!localStorage) return;

	try {
		return localStorage.setItem(key, JSON.stringify(item));
	} catch (err) {
		console.error(`Error storing item ${key} to localStoragee`, err);
	}
};

/** Persister will continually persist selected state in localStorage */
const Persister = ({ children, persist }: { children: any; persist: string[] }) => {
	const { stateChanges } = useStoreContext();

	// TODO: check if it affects page rerenders on state changes.

	if (persist.length > 0) {
		stateChanges()
			.pipe(
				throttleTime(1000),
				tap(state =>
					storeItem(
						'tpr',
						persist.reduce((acc, key) => {
							const value = state[key];
							return {
								...acc,
								[key]: value,
							};
						}, {}),
					),
				),
			)
			.subscribe();
	}

	return children;
};

export const AjaxProvider: React.FC<AjaxProviderProps> = ({ api, stores, initialState = undefined, children }) => {
	const persist = stores.map(({ name, persist }) => persist && name);
	const storeConfig = useMemo(() => {
		return createStore(
			stores.reduce((acc, { name }) => ({ ...acc, [name]: reducer(name) }), {}),
			initialState,
		);
	}, [stores]);

	return (
		<StoreProvider store={storeConfig}>
			<AjaxContext.Provider value={{ api }}>
				<Persister persist={persist}>{children}</Persister>
			</AjaxContext.Provider>
		</StoreProvider>
	);
};

export const useAjaxContext = () => {
	const ajaxUtils = useContext(AjaxContext);
	const storeUtils = useStoreContext();
	if (!storeUtils) {
		throw new Error(`Ajax compound components cannot be rendered outside the AjaxProvider component`);
	}
	return { ...ajaxUtils, ...storeUtils };
};
