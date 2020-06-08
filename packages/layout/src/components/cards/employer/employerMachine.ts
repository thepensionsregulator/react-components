import { Machine, assign } from 'xstate';

interface EmployerStates {
	states: {
		preview: {};
		employerType: {};
		remove: {
			states: {
				date: {};
				confirm: {};
				deleted: {};
			};
		};
	};
}

type EmployerEvents =
	| { type: 'CHANGE_TYPE' }
	| { type: 'REMOVE' }
	| { type: 'SAVE'; values?: any }
	| { type: 'CANCEL' }
	| { type: 'NEXT'; values?: any }
	| { type: 'DELETE' }
	| { type: 'COMPLETE'; value: boolean };

export interface EmployerContext {
	complete: boolean;
	employer: any;
}

const employerMachine = Machine<
	EmployerContext,
	EmployerStates,
	EmployerEvents
>({
	id: 'employer',
	initial: 'preview',
	context: {
		complete: false,
		employer: {},
	},
	states: {
		preview: {
			id: 'preview',
			on: {
				CHANGE_TYPE: '#employerType',
				REMOVE: '#remove',
				COMPLETE: {
					actions: assign((_, event) => ({
						complete: event.value,
					})),
				},
			},
		},
		employerType: {
			id: 'employerType',
			on: {
				SAVE: '#preview',
				CANCEL: '#preview',
			},
		},
		remove: {
			id: 'remove',
			initial: 'date',
			states: {
				date: {
					on: {
						CANCEL: '#preview',
						NEXT: 'confirm',
					},
				},
				confirm: {
					on: {
						CANCEL: '#preview',
						DELETE: 'deleted',
					},
				},
				deleted: {
					type: 'final',
				},
			},
		},
	},
});

export default employerMachine;
