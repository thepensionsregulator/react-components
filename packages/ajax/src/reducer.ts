import qs from 'qs';
import { pathOr } from 'ramda';
import { merge } from 'lodash';
import produce from 'immer';

export enum NetworkStatus {
	/**
	 * The query has never been run before and the query is now currently running. A query will still
	 * have this network status even if a partial data result was returned from the cache, but a
	 * query was dispatched anyway.
	 */
	loading = 1,

	/**
	 * If `setVariables` was called and a query was fired because of that then the network status
	 * will be `setVariables` until the result of that query comes back.
	 */
	setVariables = 2,

	/**
	 * Indicates that `fetchMore` was called on this query and that the query created is currently in
	 * flight.
	 */
	fetchMore = 3,

	/**
	 * Similar to the `setVariables` network status. It means that `refetch` was called on a query
	 * and the refetch request is currently in flight.
	 */
	refetch = 4,

	/**
	 * No request is in flight for this query, and no errors happened. Everything is OK.
	 */
	ready = 7,

	/**
	 * No request is in flight for this query, but one or more errors were detected.
	 */
	error = 8,
}

type CacheObject = {
	variables: string;
	response: any;
};

export type StoreState = {
	data: unknown | void;
	cache?: CacheObject[];
	loading: boolean;
	error: any;
	variables: any;
	networkStatus: NetworkStatus;
};

type Action = {
	type: string;
	payload?: any;
};

const initialState = {
	data: undefined,
	loading: true,
	error: undefined,
	variables: undefined,
	networkStatus: 1, // TODO: implement number states + refetch state
};

const ajaxReducer = (store: string) => {
	const UPDATE = `${store}@update`;
	const REFETCH = `${store}@refetch`;
	const RESET = `${store}@reset`;
	const FIND_AND_UPDATE = `${store}@findAndUpdate`;

	return (state: StoreState = initialState, action: Action) => {
		switch (action.type) {
			case UPDATE: {
				const loading = isNetworkRequestInFlight(
					action.payload?.networkStatus || state.networkStatus,
				);
				return {
					...state,
					...action.payload,
					loading,
				};
			}
			case REFETCH: {
				return {
					...state,
					variables: Object.assign(
						state.variables,
						action.payload?.variables || {},
					),
					networkStatus: 4,
					loading: true,
				};
			}
			case FIND_AND_UPDATE: {
				const itemId = action.payload.name;
				const dataPath = action.payload.dataPath;

				const data = pathOr([], dataPath, state.data);
				const dataItemIndex = data.findIndex(item => item.name === itemId);
				// if item was not found or no data, return state without changes
				if (dataItemIndex < 0 || !data.length) {
					console.error(`item with id ${itemId} was not found.`);
					return state;
				}

				const mergeItems = merge(data[dataItemIndex], action.payload.item);

				const midifiedData = Object.assign(data.slice(), {
					[dataItemIndex]: mergeItems,
				});

				const nextState = produce(state, draftState => {
					draftState[dataPath] = midifiedData;
				});

				return {
					...state,
					...nextState,
				};
			}
			case RESET: {
				return initialState;
			}
			default:
				return state;
		}
	};
};

export const actions = (storeName: string, send: Function) => (
	payload: object,
) => send({ type: `${storeName}@update`, payload });

/**
 * Returns true if there is currently a network request in flight according to a given network
 * status.
 */
export function isNetworkRequestInFlight(
	networkStatus: NetworkStatus,
): boolean {
	return networkStatus < 7;
}

export default ajaxReducer;
