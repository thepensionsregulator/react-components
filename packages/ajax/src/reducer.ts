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

type ReducerState = {
	data: any;
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
	data: {},
	loading: true,
	error: undefined,
	variables: undefined,
	networkStatus: 1, // TODO: implement number states + refetch state
};

const ajaxReducer = (store: string) => {
	const STATUS = `${store}@status`;
	const UPDATE = `${store}@update`;
	const REFETCH = `${store}@refetch`;
	const RESET = `${store}@reset`;

	return (state: ReducerState = initialState, action: Action) => {
		switch (action.type) {
			case STATUS: {
				return {
					...state,
					networkStatus: action.payload.status,
					loading: action.payload.loading,
				};
			}
			case UPDATE: {
				return {
					...state,
					...action.payload,
				};
			}
			case REFETCH: {
				return {
					...state,
					networkStatus: 4,
					loading: true,
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

export const actions = (storeName: string, send: Function) => {
	return {
		update: (payload: object) => {
			send({ type: `${storeName}@update`, payload });
		},
		refetch: () => {
			send({ type: `${storeName}@refetch` });
		},
	};
};

export default ajaxReducer;
