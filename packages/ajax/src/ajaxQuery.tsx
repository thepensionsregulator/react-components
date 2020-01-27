import { useEffect, ReactElement, useMemo } from 'react';
import { pathOr } from 'ramda';
import { useAjaxContext } from './context';
import { useSelector } from '@alekna/react-store';
import { actions } from './reducer';

type Request = {
	name: string;
	type: string;
	variables?: object;
};

type QueryProps = {
	query: string | Request[];
	type: 'get' | 'post';
	headers?: object;
	variables?: object;
	/** store from the global store object and for the api uri */
	store: string;
	dataPath?: any[];
	errorPath?: any[];
};

export const useQuery = ({
	query = '',
	type = 'get',
	headers = { 'Content-Type': 'application/json' },
	variables,
	store,
	dataPath = ['response', 'data'],
	errorPath = ['response', 'data', 'errors', 0, 'detail'],
}: QueryProps) => {
	const { api, dispatch } = useAjaxContext();
	/** Will select first Endpoint in an array if store is undefined or not found */
	const { instance } = api.find(({ name }) => name === store) || api[0];
	/** Send actions to the store */
	const send = useMemo(() => actions(store, dispatch), [store, dispatch]);
	/** Selected from the Global State */
	const state = useSelector(store);

	useEffect(() => {
		const fetchRequest = async () => {
			send.update({ networkStatus: 2, loading: true });
			try {
				/** If you want to execute multiple queries to server within a single request */
				// if (Array.isArray(query)) {
				// 	const data = await Promise.all(
				// 		query.map(async ({ name, type = 'get', variables: variables }) => {
				// 			const q = { query: name, variables: variables || variables };
				// 			return await instance(type, q, headers).toPromise();
				// 		}),
				// 	);
				// 	send.update({
				// 		networkStatus: 7,
				// 		data: data.map(pathOr({}, dataPath)),
				// 		error: undefined,
				// 		loading: false,
				// 	});
				// } else {
				// 	const q = { query, variables: variables };
				// 	const data = await instance(type, q, headers).toPromise();
				// 	// console.log(instance);
				// 	send.update({
				// 		networkStatus: 7,
				// 		data: pathOr({}, dataPath, data),
				// 		loading: false,
				// 		error: undefined,
				// 	});
				// }

				const q = { query, variables };
				const data = await instance(type, q, headers).toPromise();
				send.update({
					networkStatus: 7,
					data: pathOr({}, dataPath, data),
					loading: false,
					error: undefined,
					variables,
				});
			} catch (error) {
				const getError = pathOr('unknown error occurred', errorPath);
				send.update({
					networkStatus: 8,
					data: undefined,
					loading: false,
					error: getError(error),
					variables,
				});
			}
		};

		fetchRequest();
	}, [variables]);

	const refetch = () => {
		send.refetch();
	};

	const fetchMore = () => {
		/** TODO: keep original data in store and concats data to existing array */
		send.update({ networkStatus: 3, loading: true });
	};

	return { ...state, fetchMore, refetch };
};

interface AjaxQueryProps extends QueryProps {
	children: (props: any) => ReactElement;
}
export const AjaxQuery = ({ children, ...rest }: AjaxQueryProps) => {
	return children(useQuery(rest));
};
