type Action = {
	type: string;
	payload?: any;
};

const initialState = {
	data: {},
	loading: false,
	error: undefined,
	variables: undefined,
	networkStatus: 0, // TODO: implement number states + refetch state
};

const ajaxReducer = (store: string) => {
	const STATUS = `${store}@status`;
	const FULFILLED = `${store}@fulfilled`;
	const FAILED = `${store}@failed`;
	const RESET = `${store}@reset`;

	return (state = initialState, action: Action) => {
		switch (action.type) {
			case STATUS: {
				return {
					...state,
					networkStatus: action.payload,
				};
			}
			case FULFILLED: {
				return {
					...state,
					networkStatus: 7,
					data: action.payload,
					error: undefined,
				};
			}
			case FAILED: {
				return {
					...state,
					networkStatus: 9,
					error: action.payload,
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

export default ajaxReducer;
