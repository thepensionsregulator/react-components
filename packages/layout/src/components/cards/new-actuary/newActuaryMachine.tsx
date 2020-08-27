import { Machine, assign } from 'xstate';
import { NewActuary } from './context';

interface NewActuaryStates {
	states: {
		preview: {};
		edit: {
			states: {
				name: {};
				contacts: {};
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

type NewActuaryEvents =
	| { type: 'COMPLETE'; value: boolean }
	| { type: 'EDIT_INSURER' }
	| { type: 'EDIT_CONTACTS' }
	| { type: 'EDIT_NAME' }
	| { type: 'REMOVE' }
	| { type: 'CANCEL' }
	| { type: 'NEXT'; values?: any }
	| { type: 'SAVE'; values?: any }
	| { type: 'BACK' }
  | { type: 'DELETE' };
  

export interface NewActuaryMachineContext {
	complete: boolean;
	remove: { confirm: boolean; date: string } | null;
	actuary: Partial<NewActuary>;
}


const actuaryMachine = Machine<NewActuaryMachineContext, NewActuaryStates, NewActuaryEvents>({
	id: 'actuary',
	initial: 'preview',
	context: {
		complete: false,
		remove: null,
		actuary: {},
	},
	states: {
		preview: {
			id: 'preview',
			on: {
				REMOVE: '#remove',
				EDIT_INSURER: 'edit',
				EDIT_CONTACTS: 'edit.contacts',
				EDIT_NAME: 'edit.name',
				COMPLETE: {
					actions: assign((_, event) => ({
						complete: event.value,
					})),
				},
			},
		},
		edit: {
			initial: 'contacts',
			states: {
				name: {
					on: {
						SAVE: {
							target: '#preview',
							actions: assign((context, event) => ({
								actuary: {
									...context.actuary,
									...event.values,
								},
							})),
						},
						CANCEL: '#preview',
						REMOVE: '#remove',
					},
				},
				contacts: {
					on: {
						SAVE: {
							target: '#preview',
							actions: assign((context, event) => ({
								actuary: {
									...context.actuary,
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

export default actuaryMachine;
