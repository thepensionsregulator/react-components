const initialState = {
	data: {},
	networkStatus: 0, // TODO: implement number states + refetch state
	error: undefined,
};

const ajaxReducer = (stateName: string) => (state = initialState, action) => {
	switch (action.type) {
		case 'status': {
			return {
				...state,
				networkStatus: action.payload,
			};
		}
		case 'fulfilled': {
			return {
				...state,
				networkStatus: 7,
				data: action.payload,
				error: undefined,
			};
		}
		case 'failed': {
			return {
				...state,
				networkStatus: 9,
				error: action.payload,
			};
		}
		case 'reset': {
			return initialState;
		}
		default:
			return state;
	}
};

export default ajaxReducer;
