import { useSelector, useDispatch } from 'react-redux';
import { path, pathOr } from 'ramda';
import { instance } from 'shared/api';
import useSafeSetState from './useSafeSetState';
import { ReactElement } from 'react';

// use state machine here instead of useSafeSetState!

type MutationProps = {
	type: 'post' | 'put' | 'delete';
	mutation: string;
};

type MutateProps = {
	query?: string;
	variables?: object;
	headers?: object;
};

export const useMutation = ({ type = 'post', mutation = '' }: MutationProps) => {
	const config = useSelector((state: any) => state.config);
	const dispatch = useDispatch();
	const api = instance(config, dispatch);

	const [state, safeSetState] = useSafeSetState({
		error: undefined,
		loading: false,
	});

	const mutate = ({
		query,
		variables = {},
		headers = {
			'Content-Type': 'application/json',
		},
	}: MutateProps = {}) => {
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

	return { state, mutate };
};

interface AjaxMutationProps extends MutationProps {
	children: (props: any) => ReactElement;
}
export const AjaxMutation = ({ children, ...rest }: AjaxMutationProps) => children(useMutation(rest));
