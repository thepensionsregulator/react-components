import { useEffect, ReactElement } from 'react';
import { path, pathOr } from 'ramda';
import { useAjaxContext } from './context';
import { useSelector } from '@alekna/react-store';
import { actions } from './reducer';

// NOTE: try to use xstate https://xstate.js.org

type Request = {
	name: string;
	type: string;
	params?: object;
};

type QueryProps = {
	query: string | Request[];
	type: 'get' | 'post';
	headers?: object;
	params?: object;
	/** store from the global store object and for the api uri */
	store: string;
	dataPath?: any[];
	errorPath?: any[];
};

export const useQuery = ({
	query = '',
	type = 'get',
	headers = { 'Content-Type': 'application/json' },
	params,
	store,
	dataPath = ['response', 'data'],
	errorPath = ['response', 'data', 'errors', 0, 'detail'],
}: QueryProps) => {
	const { api, dispatch } = useAjaxContext();
	/** Will select first Endpoint in an array if store is undefined or not found */
	const { instance } = api.find(({ name }) => name === store) || api[0];
	/** Send actions to the store */
	const send = actions(store, dispatch);
	/** Selected from the Global State */
	const state: any = useSelector(store, {});

	const refetch = () => send.refetch();

	const fetchMore = () => {
		/** keeps original data in store and concats data to existing array */
		return null;
	};

	/* eslint-disable */
	useEffect(() => {
		const fetchRequest = async () => {
			send.update({ networkStatus: 1, loading: true });
			try {
				/** If you want to execute multiple queries to server within a single request */
				if (Array.isArray(query)) {
					const data = await Promise.all(
						query.map(async ({ name, type = 'get', params: variables }) => {
							const q = { query: name, variables: variables || params };
							return await instance(type, q, headers).toPromise();
						}),
					);
					send.update({
						networkStatus: 7,
						data: data.map(pathOr({}, dataPath)),
						error: undefined,
						loading: false,
					});
				} else {
					const q = { query, variables: params };
					const data = await instance(type, q, headers).toPromise();
					// console.log(instance);
					send.update({
						networkStatus: 7,
						data: pathOr({}, dataPath, data),
						loading: false,
						error: undefined,
					});
				}
			} catch (error) {
				const getError = path(errorPath);
				send.update({
					networkStatus: 8,
					data: undefined,
					loading: false,
					error: getError(error) || 'unknown error occurred',
				});
			}
		};

		fetchRequest();
	}, [params, state.networkStatus]);

	return { ...state, fetchMore, refetch };
};

interface AjaxQueryProps extends QueryProps {
	children: (props: any) => ReactElement;
}
export const AjaxQuery = ({ children, ...rest }: AjaxQueryProps) =>
	children(useQuery(rest));
