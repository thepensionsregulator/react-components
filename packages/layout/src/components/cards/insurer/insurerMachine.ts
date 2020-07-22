import { Machine, assign } from 'xstate';
import { InsurerProps } from './context';

interface InsurerStates {
	states: {
		preview: {};
		remove: {
			states: {
				date: {};
				confirm: {};
				deleted: {};
			};
		};
	};
}

type InsurerEvents =
	| { type: 'COMPLETE'; value: boolean }
	| { type: 'CANCEL' }
	| { type: 'NEXT'; values?: any }
	| { type: 'BACK' }
	| { type: 'DELETE' };

export interface InsurerContext {
	complete: boolean;
	remove: { confirm: boolean; date: string } | null;
	insurer: Partial<InsurerProps>;
}

const insurerMachine = Machine<InsurerContext, InsurerStates, InsurerEvents>({
	id: 'insurer',
	initial: 'preview',
	context: {
		complete: false,
		remove: null,
		insurer: {},
	},
	states: {
		preview: {
			id: 'preview',
			on: {
				REMOVE: '#remove',
				COMPLETE: {
					actions: assign((_, event) => ({
						complete: event.value,
					})),
				},
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

export default insurerMachine;
