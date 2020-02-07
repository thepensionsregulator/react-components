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

type MutateFnProps = {
	variables?: object;
	headers?: object;
	refetchQueries?: string[];
};

type MutationState = {
	data: unknown;
	loading: boolean;
	error: unknown;
};
export interface IMutationReturns extends MutationState {
	mutate: <T>(props?: MutateFnProps) => Promise<T>;
}

export const useMutation = ({
	method = 'post',
	endpoint = '',
	api,
	dataPath = ['response', 'data'],
	errorPath = ['response', 'errors', 0],
}: MutationProps): IMutationReturns => {
	/** use context to get values from the Provider */
	const { api: apis, dispatch } = useAjaxContext();
	/** Will select first Endpoint in an array if store is undefined or not found */
	const { instance, name } = useMemo(
		() => apis.find(({ name }) => name === api) || apis[0],
		[apis],
	);

	const initialState = {
		data: undefined,
		loading: false,
		error: undefined,
	};
	const reducer = <S extends MutationState, A>(prev: S, next: A): S => ({
		...prev,
		...next,
	});
	const [state, setState] = useReducer(reducer, initialState);

	const mutate = ({
		variables = {},
		headers = {
			'Content-Type': 'application/json',
		},
		refetchQueries,
	}: MutateFnProps = {}) => {
		setState({ loading: true, error: undefined });

		return instance({
			endpoint,
			variables,
			method,
			headers,
		})
			.toPromise()
			.then((resp: unknown) => {
				const response = path(dataPath, resp);
				console.log('we are here', response);
				/** refetch all queries from provided array in existing stores on request */
				if (Array.isArray(refetchQueries) && refetchQueries.length > 0) {
					refetchQueries.map(store =>
						dispatch({ type: `${store}@refetch`, payload: { loading: true } }),
					);
				}

				setState({ loading: false, data: response });
				return response;
			})
			.catch((err: unknown) => {
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
export const AjaxMutation = ({ children, ...rest }: AjaxQueryProps) => {
	return children(useMutation(rest));
};
