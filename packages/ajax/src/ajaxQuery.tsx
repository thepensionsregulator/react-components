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
	/** http endpoint for the selected api */
	endpoint: string;
	/** http get or post methods */
	method?: 'get' | 'post';
	/** headers can be overwritten */
	headers?: object;
	/** variables will be stringified and attached to the endpoint */
	variables?: object;
	/** api from global apis, if none specified then the first one in the list is the default one */
	api?: string;
	/** store from the global store object */
	store: string;
	/** to extract data to specific depth level */
	dataPath?: any[];
	/** to extract error to specific depth level */
	errorPath?: any[];
	/** on fetchMore merge data with existing one */
	mergeData?: (f: any, s: any) => any;
};

// TODO: get dataPath and errorPath from context if available

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
			return send({
				networkStatus: 2,
				variables,
			});
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

		/** Key is the identifier of the query */
		const _key = stringifyEndpoint(method, endpoint, state.variables);

		if (CONCURRENT_PROMISES[_key]) {
			/** Currently this Promise is already in flight therefore we do nothing.
			 * Reply will be shared with all subscribed components automatically. */
			return undefined;
		}

		/** can hold a fetch method for this particular query and later be re-used.
		 * This has the ability to extend this hook to be able to use its own fetch
		 * function by mounting it instead of an object */
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
			/** Delete concurrent promise as it now finished and was successful */
			delete CONCURRENT_PROMISES[_key];
			/** Response was successfull. Update the store with new state */
			let data = pathOr({}, dataPath, response);
			/** We are merging data here on fetchMore request */
			if (state.networkStatus === 3) {
				data = mergeData(state.data, data);
			}
			/** Update the state with successful response */
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

	const refetch = () => send({ networkStatus: 4 });

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
