import { Machine } from 'xstate';

// loading: false,
// networkStatus: 0,

const fetchMachine = Machine({
	id: 'fetch',
	initial: 'idle',
	context: {
		data: {},
		error: undefined,
		variables: undefined,
	},
	states: {
		idle: {},
	},
});

export default fetchMachine;
