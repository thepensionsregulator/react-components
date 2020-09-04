import { Machine, assign } from 'xstate';
import { Insurer } from './context';

interface InsurerStates {
	states: {
		preview: {};
		edit: {
			states: {
				reference: {};
			};
		};
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
	| { type: 'EDIT_INSURER' }
	| { type: 'REMOVE' }
	| { type: 'CANCEL' }
	| { type: 'NEXT'; values?: any }
	| { type: 'SAVE'; values?: any }
	| { type: 'BACK' }
	| { type: 'DELETE' };

export interface InsurerContext {
	complete: boolean;
	remove: { confirm: boolean; date: string } | null;
	insurer: Partial<Insurer>;
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
				EDIT_INSURER: 'edit',
				COMPLETE: {
					actions: assign((_, event) => ({
						complete: event.value,
					})),
				},
			},
		},
		edit: {
			initial: 'reference',
			states: {
				reference: {
					id: 'reference',
					on: {
						SAVE: {
							target: '#preview',
							actions: assign((context, event) => ({
								insurer: {
									...context.insurer,
									...event.values,
								},
							})),
						},
						CANCEL: '#preview',
						REMOVE: '#remove',
					},
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
