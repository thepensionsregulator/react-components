import { useEffect, useMemo, useState } from 'react';
import { pathOr } from 'ramda';
import { useAjaxContext } from './context';
import { useSelector } from './store/store';
import { actions } from './reducer';
import { distinctUntilChanged, tap, catchError } from 'rxjs/operators';
import { isEqual } from 'lodash';
import { StoreState } from './reducer';
import { of } from 'rxjs';

type Request = {
	name: string;
	type: string;
	variables?: object;
};

type QueryProps = {
	query: string | Request[];
	type?: 'get' | 'post';
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
	query = '',
	type = 'get',
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
	/** Selected from the Global State */
	// ERROR: initially, initialState is always initialState, even if there were actions
	// produced and new instance loaded, it will have old initialState
	const state = useSelector<StoreState>(store, state$ =>
		state$.pipe(distinctUntilChanged(isEqual)),
	);
	/** Send actions to the store */
	const send = actions(store, dispatch);
	/** refresh state if number changed. Helps to refetch on a number
	 * change rather than boolean change. If we watch a boolean change
	 * it will refetch if it changes to true or false and might endup
	 * when it refetches multiple times instead of only refetching once.
	 */
	const [refresh, setRefresh] = useState(0);

	useEffect(() => {
		if (state.networkStatus === 7) {
			/** most likely store was rehidrated from localStorage */
			return;
		}

		const sub = instance(type, { query, variables }, headers)
			.pipe(
				tap(() => {
					if (state.networkStatus === 1) {
						// setting variables
						send({
							networkStatus: 2,
							loading: true,
							variables,
						});
					}
				}),
				catchError(err => {
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
				let data = pathOr({}, dataPath, response).slice(0, 10);

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
			sub.unsubscribe();
		};
	}, [query, store, refresh]);

	//** METHODS */

	const refetch = () => {
		send({ networkStatus: 4, loading: true });
		setRefresh(refresh + 1);
	};

	const fetchMore = async (vars = {}) => {
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
