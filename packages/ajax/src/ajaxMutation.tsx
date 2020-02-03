import { path, pathOr } from 'ramda';
import { useAjaxContext } from './context';
import { useMemo, useReducer } from 'react';

export type MutationProps = {
	method?: 'post' | 'put' | 'delete';
	endpoint: string;
	/** select the api from available apis */
	api?: string;
	dataPath?: any[];
	errorPath?: any[];
};

type MutateProps = {
	variables?: object;
	headers?: object;
	refetchQueries?: string[];
};

export const useMutation = ({
	method = 'post',
	endpoint = '',
	api,
	dataPath = ['response', 'data'],
	errorPath = ['response', 'errors', 0],
}: MutationProps) => {
	/** use context to get values from the Provider */
	const { api: apis, dispatch, stateChanges }: any = useAjaxContext();
	/** Will select first Endpoint in an array if store is undefined or not found */
	const { instance, name } = useMemo(
		() => apis.find(({ name }) => name === api) || apis[0],
		[apis],
	);
	const [state, setState] = useReducer((p, n) => ({ ...p, ...n }), {
		data: undefined,
		loading: false,
		error: undefined,
	});

	const mutate = ({
		variables = {},
		headers = {
			'Content-Type': 'application/json',
		},
		refetchQueries,
	}: MutateProps = {}) => {
		setState({ loading: true, error: undefined });

		const params = { endpoint, variables };
		return instance(method, params, headers)
			.toPromise()
			.then((resp: object) => {
				const response = path(dataPath, resp);

				if (Array.isArray(refetchQueries) && refetchQueries.length > 0) {
					refetchQueries.map(store => dispatch({ type: `${store}@refetch` }));
				}

				setState({ loading: false, data: response });
				return response;
			})
			.catch((err: any) => {
				const errorMessage = pathOr(
					{
						detail: `Unkown error occured while processing your request: ${name}/${endpoint}`,
					},
					errorPath,
					err,
				);
				setState({ error: errorMessage, loading: false });
				throw Error(JSON.stringify(errorMessage));
			});
	};

	return { ...state, mutate };
};

interface AjaxQueryProps extends MutationProps {
	children: (props: any) => JSX.Element;
}
export const AjaxQuery = ({ children, ...rest }: AjaxQueryProps) => {
	return children(useMutation(rest));
};
