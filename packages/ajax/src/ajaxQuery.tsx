import { useEffect, useMemo, useState } from 'react';
import { pathOr } from 'ramda';
import { useAjaxContext } from './context';
import { useSelector } from '@alekna/react-store';
import { actions } from './reducer';
import { distinctUntilChanged, tap, catchError } from 'rxjs/operators';
import { isEqual } from 'lodash';
import { StoreState } from './reducer';
import { of } from 'rxjs';
import { stringifyEndpoint } from './utils';

export type QueryProps = {
	endpoint: string;
	method?: 'get' | 'post';
	headers?: object;
	variables?: object;
	/** store from the global store object and for the api uri */
	store: string;
	dataPath?: any[];
	errorPath?: any[];
	mergeData?: (f: any, s: any) => any;
	fetchPolicy?: 'network-only' | 'cache-and-network';
};

export const useQuery = ({
	endpoint = '',
	method = 'get',
	headers = { 'Content-Type': 'application/json' },
	variables,
	store,
	dataPath = ['response'],
	errorPath = ['response', 'data', 'errors', 0, 'detail'],
	mergeData = (f, s) => [...f, ...s],
	fetchPolicy = 'network-only',
}: QueryProps) => {
	const { api, dispatch } = useAjaxContext();
	/** Will select first Endpoint in an array if store is undefined or not found */
	const { instance } = useMemo(
		() => api.find(({ name }) => name === store) || api[0],
		[api],
	);
	/** Select state from the global state efficiently. Update only if
	 * prev state does not match new state */
	const state = useSelector<StoreState>(store, state$ =>
		state$.pipe(distinctUntilChanged(isEqual)),
	);
	/** Send actions to the store */
	const send = actions(store, dispatch);
	/** Refresh state if number changed. Helps to refetch on a number
	 * change rather than boolean change. If we watch a boolean change
	 * it will refetch if it changes to true or false and might endup
	 * where it refetches multiple times instead of only refetching once. */
	const [refresh, setRefresh] = useState(0);

	useEffect(() => {
		if (state.networkStatus === 7) {
			/** State already has data in it and is ready to be rendered.
			 * Most likely store was rehidrated from the localStorage or another
			 * component that was previously loaded. */
			return;
		}

		const params = {
			endpoint: stringifyEndpoint(method, endpoint, variables),
			variables,
		};

		const sub = instance(method, params, headers)
			.pipe(
				tap(() => {
					if (state.networkStatus === 1) {
						/** Set the variables for the first time. */
						send({
							networkStatus: 2,
							loading: true,
							variables,
						});
					}
				}),
				catchError(err => {
					/** Catch the error if there was any, extract it from the object
					 * and pass it on to the store */
					const getError = pathOr('unknown error occurred', errorPath);
					return of(getError(err)).pipe(
						tap(error =>
							send({
								networkStatus: 8,
								data: undefined,
								loading: false,
								error,
							}),
						),
					);
				}),
			)
			.subscribe(response => {
				/** Response was successfull. Update the store with new state */
				let data = pathOr([], dataPath, response).slice(0, 10);

				if (state.networkStatus === 3) {
					data = mergeData(state.data, data);
				}

				send({
					networkStatus: 7,
					data,
					loading: false,
					error: undefined,
				});
			});

		return () => {
			/** Cleanup the subscription when component unmounts. */
			sub.unsubscribe();
		};
	}, [endpoint, store, refresh]);

	//** METHODS */

	const refetch = () => {
		send({ networkStatus: 4, loading: true });
		setRefresh(refresh + 1);
	};

	const fetchMore = (vars = {}) => {
		send({ networkStatus: 3, variables: { ...variables, ...vars } });
		setRefresh(refresh + 1);
	};

	return { ...state, fetchMore, refetch };
};

interface AjaxQueryProps extends QueryProps {
	children: (props: any) => JSX.Element;
}
export const AjaxQuery = ({ children, ...rest }: AjaxQueryProps) => {
	return children(useQuery(rest));
};
