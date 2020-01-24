import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { path, pathOr } from 'ramda';
import { instance } from 'shared/api';
import useSafeSetState from './useSafeSetState';

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
	children: any;
};

export const AjaxQuery: React.FC<QueryProps> = ({
	query = '',
	type = 'get',
	headers = { 'Content-Type': 'application/json' },
	params,
	children,
}) => {
	const config = useSelector((state: any) => state.config);
	const dispatch = useDispatch();
	const api = instance(config, dispatch);
	const [refetch, setRefetch] = useSafeSetState(0);
	const [state, safeSetState] = useSafeSetState({
		data: undefined,
		error: undefined,
		loading: true,
	});

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
							return await api(type, q, headers).toPromise();
						}),
					);
					safeSetState({
						data: data.map(pathOr({}, ['response', 'data'])),
						error: undefined,
						loading: false,
					});
				} else {
					const q = { query, variables: params };
					const data = await api(type, q, headers).toPromise();
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

	const mutate = ({
		query,
		variables = {},
		headers = {
			'Content-Type': 'application/json',
		},
	}: MutateFnProps = {}) => {
		safeSetState({ loading: true, error: undefined });
		const params = { query: query ? query : mutation, variables };
		return api(type, params, headers)
			.toPromise()
			.then((resp: object) => {
				const response = path(['response', 'data'], resp);
				safeSetState({ loading: false });
				return response;
			})
			.catch((err: any) => {
				const errorMessage = pathOr(
					{
						detail: `Unkown error occured while processing your request: ${mutation}`,
					},
					['response', 'errors', 0],
					err,
				);
				safeSetState({ error: errorMessage, loading: false });
				throw Error(JSON.stringify(errorMessage));
			});
	};

	return children({ ...state, refetchQuery });
};
