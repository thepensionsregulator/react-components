import { useEffect, useMemo, useCallback } from 'react';
import { pathOr } from 'ramda';
import { useAjaxContext, CONCURRENT_PROMISES } from './context';
import { useSelector } from '@alekna/react-store';
import { actions } from './reducer';
import { distinctUntilChanged, pluck, filter, map } from 'rxjs/operators';
import { isEqual } from 'lodash';
import { StoreState } from './reducer';
import { stringifyEndpoint } from './utils';
import { findAndModify, FindAndModifyProps } from './reducer';

export type QueryProps = {
	endpoint: string;
	method?: 'get' | 'post';
	headers?: object;
	variables?: object;
	/** store from the global store object and for the api uri */
	api?: string;
	store: string;
	dataPath?: any[];
	errorPath?: any[];
	mergeData?: (f: any, s: any) => any;
	fetchPolicy?: 'network-only' | 'cache-and-network';
};

export const useQuery = ({
	endpoint = '',
	method = 'get',
	headers = { 'Content-Type': 'application/json' },
	variables,
	api,
	store,
	dataPath = [],
	errorPath = [],
	mergeData = (f, s) => [...f, ...s],
}: QueryProps) => {
	const { api: apis, dispatch } = useAjaxContext();
	/** Will select first Endpoint in an array if store is undefined or not found */
	const { instance } = useMemo(
		() => apis.find(({ name }) => name === api) || apis[0],
		[apis],
	);
	// const fetch$ = instance(dispatch);
	/** Select state from the global state efficiently. Update only if
	 * prev state does not match new state */
	const state = useSelector<StoreState>(store, state$ =>
		state$.pipe(distinctUntilChanged(isEqual)),
	);
	/** status matches the networkStatus  */
	const statusMaches = (n: number) => state.networkStatus === n;
	/** Send actions to the store */
	const send = actions(store, dispatch);

	useEffect(() => {
		/** Set the variables for the first time. */
		if (statusMaches(1)) {
			send({
				networkStatus: 2,
				variables,
			});
			return undefined;
		}

		/** State already has data in it and is ready to be rendered.
		 * Most likely store was rehidrated from the localStorage or another
		 * component that was previously loaded. */
		if (statusMaches(7)) {
			return undefined;
		}

		if (statusMaches(8)) {
			/** Requests have failed, we don't want to kick off the instance again
			 * until user interacts with UI again. */
			return undefined;
		}

		// TODO: should track request, if same request is already on-going then stop next one.
		// might track by unique key of the request.

		/** Key is the identifier of the query */
		const _key = stringifyEndpoint(method, endpoint, state.variables);

		if (CONCURRENT_PROMISES[_key]) {
			/** Currently this Promise is already in flight therefore we do nothing.
			 * Reply will be shared with all components automatically. */
			return undefined;
		}

		/** can hold a fetch method for this particular query and later re-used */
		CONCURRENT_PROMISES[_key] = {};

		/** Network call starts here */
		const sub = instance({
			endpoint: _key,
			variables: state.variables,
			method,
			headers,
			send,
			errorPath,
		}).subscribe((response: unknown) => {
			/** Response was successfull. Update the store with new state */
			let data = pathOr({}, dataPath, response);

			if (state.networkStatus === 3) {
				data = mergeData(state.data, data);
			}

			delete CONCURRENT_PROMISES[_key];

			send({
				networkStatus: 7,
				data,
				error: undefined,
			});
		});

		return () => {
			/** Cleanup the subscription when component unmounts. */
			sub.unsubscribe();
		};
	}, [endpoint, store, state.networkStatus]);

	//** METHODS */

	const refetch = () => {
		send({ networkStatus: 4 });
	};

	const fetchMore = (callback: (_: any) => { [key: string]: any }) => {
		send({
			networkStatus: 3,
			variables: { ...state.variables, ...callback(state.variables) },
		});
	};

	return { ...state, fetchMore, refetch };
};

interface AjaxQueryProps extends QueryProps {
	children: (props: any) => JSX.Element;
}
export const AjaxQuery = ({ children, ...rest }: AjaxQueryProps) => {
	return children(useQuery(rest));
};

type UpdateProps = {
	key?: string;
	store: string;
	search?: string;
	dataPath: string[];
	modify?: boolean;
};

export const useUpdate = ({ key = 'id', ...props }: UpdateProps) => {
	const { dispatch } = useAjaxContext();
	const selectedItem = useSelector<StoreState>(props.store, state$ =>
		state$.pipe(
			pluck(...['data'].concat(props.dataPath)),
			filter(Array.isArray),
			map(items => items.find(item => item[key] === props.search)),
			distinctUntilChanged(),
		),
	);

	return useCallback(
		(search?: string, params?: object | Function) => {
			const args: FindAndModifyProps =
				typeof params === 'function' ? params(selectedItem) : params;
			dispatch(
				findAndModify(
					{ key, ...props, search: props.search ? props.search : search },
					args,
				),
			);
		},
		[dispatch, selectedItem],
	);
};
