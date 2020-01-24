import { useEffect, ReactElement, useState } from 'react';
import { path, pathOr } from 'ramda';
import { useAjaxContext } from 'context';
import { useSelector } from '@alekna/react-store';

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
	store?: string;
};

const actions = (storeName: string, send: Function) => {
	return {
		status: (payload: any) => send({ type: `${storeName}@status`, payload }),
	};
};

export const useQuery = ({
	query = '',
	type = 'get',
	headers = { 'Content-Type': 'application/json' },
	params,
	store,
}: QueryProps) => {
	const { api: apis, dispatch } = useAjaxContext();
	/** Will select first Endpoint in an array if store is undefined or not found */
	const { instance } = apis.find(({ name }) => name === store) || apis[0];
	/** Send actions to the store */
	const send = actions(store, dispatch);
	/** Selected from the Global State */
	const state = useSelector(store, {});
	/** refetch functionallity */
	const [refetch, setRefetch] = useState(0);
	const refetchQuery = () => setRefetch(refetch + 1);

	/* eslint-disable */
	useEffect(() => {
		const fetchRequest = async () => {
			safeSetState({ loading: true });
			try {
				if (Array.isArray(query)) {
					const data = await Promise.all(
						query.map(async ({ name, type = 'get', params: variables }) => {
							const q = { query: name, variables: variables || params };
							return await instance(type, q, headers).toPromise();
						}),
					);
					safeSetState({
						data: data.map(pathOr({}, ['response', 'data'])),
						error: undefined,
						loading: false,
					});
				} else {
					const q = { query, variables: params };
					const data = await instance(type, q, headers).toPromise();
					safeSetState({
						data: pathOr({}, ['response', 'data'], data),
						loading: false,
						error: undefined,
					});
				}
			} catch (error) {
				const getError = path(['response', 'data', 'errors', 0, 'detail']);
				safeSetState({
					data: undefined,
					error: getError(error) || 'unknown error occurred',
					loading: false,
				});
			}
		};

		fetchRequest();
	}, [params, refetch]);

	return { ...state, refetchQuery };
};

interface AjaxQueryProps extends QueryProps {
	children: (props: any) => ReactElement;
}
export const AjaxQuery = ({ children, ...rest }: AjaxQueryProps) => children(useQuery(rest));
