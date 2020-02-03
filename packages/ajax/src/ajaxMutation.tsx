import { path, pathOr } from 'ramda';
import { useAjaxContext } from 'context';
import { useMemo, useState, useReducer } from 'react';
import { actions } from './reducer';

type MutationProps = {
	method?: 'post' | 'put' | 'delete';
	endpoint: string;
	/** select the api from available apis */
	api: string;
	dataPath?: any[];
	errorPath?: any[];
};

type MutateProps = {
	variables?: object;
	headers?: object;
	refetchQueries?: string[];
	optimisticResponse?: object;
};

export const useMutation = ({
	method = 'post',
	endpoint = '',
	api,
	dataPath = ['response', 'data'],
	errorPath = ['response', 'errors', 0],
}: MutationProps) => {
	const { api: apis, dispatch } = useAjaxContext();
	/** Will select first Endpoint in an array if store is undefined or not found */
	const { instance } = useMemo(
		() => apis.find(({ name }) => name === api) || apis[0],
		[apis],
	);
	/** Select state from the global state efficiently. Update only if
	 * prev state does not match new state */

	const [state, setState] = useReducer((p, next) => ({ ...p, ...next }), {
		error: undefined,
		loading: false,
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
				setState({ loading: false });
				const response = path(dataPath, resp);

				if (Array.isArray(refetchQueries) && refetchQueries.length > 0) {
					refetchQueries.map(store => {
						const send = actions(store, dispatch);
						send({ action: `${store}@refetch` });
					});
				}

				return response;
			})
			.catch((err: any) => {
				const errorMessage = pathOr(
					{
						detail: `Unkown error occured while processing your request: ${endpoint}`,
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
