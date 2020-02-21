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

type StoreParams = {
	name: string;
	variables?: { [key: string]: any };
};

type MutateFnProps = {
	variables?: object;
	headers?: object;
	refetchStores?: string[] | StoreParams[];
};

type MutationState = {
	data: unknown;
	loading: boolean;
	error: unknown;
};

export interface IMutationReturns extends MutationState {
	mutate: (props?: MutateFnProps) => Promise<unknown>;
}

// TODO: get dataPath and errorPath from context if available

export const useMutation = ({
	method = 'post',
	endpoint = '',
	api,
	dataPath = [],
	errorPath = [],
}: MutationProps): IMutationReturns => {
	/** use context to get values from the Provider */
	const { api: apis, dispatch } = useAjaxContext();
	/** Will select first Endpoint in an array if store is undefined or not found */
	const { instance, name } = useMemo(
		() => apis.find(({ name }) => name === api) || apis[0],
		[apis],
	);
	/** mutation state to keep trak if it's loading and if it had any errors */
	const reducer = <S extends MutationState, A>(prev: S, next: A): S => ({
		...prev,
		...next,
	});
	const [state, setState] = useReducer(reducer, {
		data: undefined,
		loading: false,
		error: undefined,
	});

	const mutate = ({
		variables = {},
		headers = {
			'Content-Type': 'application/json',
		},
		refetchStores,
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

				/** refetch all queries from provided array in existing stores on request */
				if (Array.isArray(refetchStores) && refetchStores.length > 0) {
					for (const store of refetchStores) {
						if (typeof store === 'string') {
							dispatch({ type: `${store}@refetch` });
						}
						if (typeof store === 'object' && 'name' in store) {
							dispatch({
								type: `${store.name}@refetch`,
								payload: {
									variables: store.variables,
								},
							});
						}
					}
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
