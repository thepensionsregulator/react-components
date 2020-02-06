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
	const RESET = `${store}@reset`;
	const REFETCH = `${store}@refetch`;

	return (state: StoreState = initialState, action: Action) => {
		switch (action.type) {
			case UPDATE: {
				return {
					...state,
					...action.payload,
				};
			}
			case RESET: {
				return initialState;
			}
			case REFETCH: {
				return {
					...state,
					loading: action.payload.loading
						? action.payload.loading
						: state.loading,
					networkStatus: 4,
				};
			}
			default:
				return state;
		}
	};
};

export const actions = (storeName: string, send: Function) => (
	payload: object,
) => send({ type: `${storeName}@update`, payload });

export default ajaxReducer;
