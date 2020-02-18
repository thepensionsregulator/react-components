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
	networkStatus: 1,
};

const ajaxReducer = (store: string) => {
	const UPDATE = `${store}@update`;
	const REFETCH = `${store}@refetch`;
	const RESET = `${store}@reset`;
	const FIND_AND_MODIFY = `${store}@findAndModify`;

	return (state: StoreState = initialState, action: Action) => {
		switch (action.type) {
			case UPDATE: {
				return {
					...state,
					...action.payload,
					loading: isNetworkRequestInFlight(
						action.payload?.networkStatus || state.networkStatus,
					),
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
			case FIND_AND_MODIFY: {
				const key = action.payload.key;
				const itemId = action.payload[key];
				const dataPath = action.payload.dataPath;

				const data = pathOr([], dataPath, state.data);
				const dataItemIndex = data.findIndex(item => item[key] === itemId);
				// if item was not found or no data, return state without changes
				if (dataItemIndex < 0 || !data.length) {
					console.error(`item with id ${itemId} was not found.`);
					return state;
				}
				// modify state with immer, only imutable state will take affect.
				return {
					...state,
					data: produce(state.data, draftState => {
						/** Get data from path */
						const draftFromPath = pathOr([], dataPath, draftState);
						/** Make an update */
						let newData: object;

						if (action.payload.modify) {
							/** Modify will merge the two and only touch new values */
							newData = merge(
								draftFromPath[dataItemIndex],
								action.payload.update,
							);
						} else {
							/** Update will replace an item */
							newData = action.payload.update;
						}

						draftState[dataPath] = Object.assign(draftFromPath, {
							[dataItemIndex]: newData,
						});
					}),
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

export const actions = (storeName: string, dispatch: Function) => (
	payload: object,
) => dispatch({ type: `${storeName}@update`, payload });

export type FindAndModifyProps = {
	key?: string;
	store: string;
	search: string;
	dataPath: string[];
	modify?: boolean;
};
export const findAndModify = (options: FindAndModifyProps, update: any) => {
	const { key = 'id', store, search, dataPath, modify = true } = options;

	return {
		type: `${store}@findAndModify`,
		payload: {
			key,
			name: search,
			dataPath,
			modify,
			update,
		},
	};
};

/**
 * Returns true if there is currently a network request in flight
 * according to a given network status.
 */
export function isNetworkRequestInFlight(
	networkStatus: NetworkStatus,
): boolean {
	return networkStatus < 7;
}

export default ajaxReducer;
