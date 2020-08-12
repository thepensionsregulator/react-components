import { Machine, assign } from 'xstate';
import { EmployerProps } from './context';

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
	| { type: 'BACK' }
	| { type: 'DELETE' }
	| { type: 'COMPLETE'; value: boolean };

export interface EmployerContext {
	complete: boolean;
	remove: { confirm: boolean; date: string } | null;
	employer: Partial<EmployerProps>;
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
		remove: null,
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
				SAVE: {
					target: '#preview',
					actions: assign((context, event) => ({
						employer: {
							...context.employer,
							employerType: event.values.employerType,
							statutoryEmployer: event.values.statutoryEmployer,
						},
					})),
				},
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
						NEXT: {
							target: 'confirm',
							actions: assign((_, event) => {
								return {
									remove: event.values,
								};
							}),
						},
					},
				},
				confirm: {
					on: {
						CANCEL: '#preview',
						BACK: '#remove',
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
