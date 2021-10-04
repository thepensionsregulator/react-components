import { Machine, assign } from 'xstate';
import { Insurer } from './context';
import {
	CommonCardMachineContext,
	RemoveConfirmProps,
} from '../common/interfaces';
import {
	updateClickedButton,
	returnToPreview,
} from '../common/machine/actions';

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

export interface InsurerContext extends CommonCardMachineContext {
	insurer: Partial<Insurer>;
	remove: RemoveConfirmProps;
}

const insurerMachine = Machine<InsurerContext, InsurerStates, InsurerEvents>({
	id: 'insurer',
	initial: 'preview',
	context: {
		complete: false,
		remove: null,
		insurer: {},
		lastBtnClicked: null,
	},
	states: {
		preview: {
			id: 'preview',
			on: {
				REMOVE: {
					target: '#remove',
					actions: updateClickedButton(2),
				},
				EDIT_INSURER: {
					target: 'edit',
					actions: updateClickedButton(5),
				},
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
						REMOVE: returnToPreview(2),
						EDIT_INSURER: '#preview',
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
						REMOVE: '#preview',
					},
				},
				confirm: {
					on: {
						CANCEL: '#preview',
						BACK: '#remove',
						DELETE: 'deleted',
						REMOVE: '#preview',
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
