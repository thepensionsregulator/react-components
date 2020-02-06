import { useEffect, useMemo } from 'react';
import { pathOr } from 'ramda';
import { useAjaxContext } from './context';
import { useSelector } from '@alekna/react-store';
import { actions } from './reducer';
import {
	distinctUntilChanged,
	catchError,
	retryWhen,
	tap,
} from 'rxjs/operators';
import { isEqual } from 'lodash';
import { StoreState } from './reducer';
import { throwError } from 'rxjs';
import { stringifyEndpoint } from './utils';
import { genericRetryStrategy } from './retryStrategy';

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
	dataPath = ['response'],
	errorPath = ['response', 'message'],
	mergeData = (f, s) => [...f, ...s],
	fetchPolicy = 'network-only',
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
				loading: true,
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

		const sub = instance({
			endpoint: stringifyEndpoint(method, endpoint, state.variables),
			variables: state.variables,
			method,
			headers,
		})
			.pipe(
				/** Retry multiple times upon failure */
				retryWhen(
					genericRetryStrategy({
						maxRetryAttempts: 5,
						excludedStatusCodes: [500],
					}),
				),
				/** Catch a error if there was any, extract it from the object
				 * and pass it on to the store to notify client */
				catchError(err => {
					const getError = pathOr('unknown error occurred', errorPath);
					send({
						networkStatus: 8,
						data: undefined,
						loading: false,
						error: getError(err),
					});
					return throwError(getError(err));
				}),
			)
			.subscribe((response: unknown) => {
				/** Response was successfull. Update the store with new state */
				let data = pathOr({}, dataPath, response);

				if (state.networkStatus === 3) {
					data = mergeData(state.data, data);
				}

				send({
					networkStatus: 7,
					data,
					loading: false,
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
		send({ networkStatus: 4, loading: true });
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
