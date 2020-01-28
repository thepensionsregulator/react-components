import { useEffect, useMemo } from 'react';
import { pathOr } from 'ramda';
import { useAjaxContext } from './context';
import { useSelector } from '@alekna/react-store';
import { actions } from './reducer';
import { distinctUntilChanged } from 'rxjs/operators';
import { isEqual } from 'lodash';

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
	dataPath = ['response'],
	errorPath = ['response', 'data', 'errors', 0, 'detail'],
}: QueryProps) => {
	const { api, dispatch } = useAjaxContext();
	/** Will select first Endpoint in an array if store is undefined or not found */
	const { instance } = useMemo(
		() => api.find(({ name }) => name === store) || api[0],
		[api],
	);
	/** Send actions to the store */
	const send = useMemo(() => actions(store, dispatch), [store, dispatch]);
	/** Selected from the Global State */
	const state = useSelector(store, (obs: any) =>
		obs.pipe(distinctUntilChanged(isEqual)),
	);
	const isRefetching = state.networkStatus === 4;

	// send.update({ networkStatus: 2, loading: true });
	// ERROR: for some reason there is one unnecessary re-render...
	console.log('HOOK', state);

	useEffect(() => {
		const fetchRequest = async () => {
			try {
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
	}, [query, isRefetching]);

	const refetch = () => {
		console.log('REFETCHING');
		send.refetch();
	};

	const fetchMore = () => {
		/** TODO: keep original data in store and concat data with an existing array */
		send.update({ networkStatus: 3, loading: true });
	};

	return { ...state, fetchMore, refetch };
};

interface AjaxQueryProps extends QueryProps {
	children: (props: any) => JSX.Element;
}
export const AjaxQuery = ({ children, ...rest }: AjaxQueryProps) => {
	return children(useQuery(rest));
};
