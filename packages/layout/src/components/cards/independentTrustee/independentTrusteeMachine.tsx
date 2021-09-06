import { Machine, assign } from 'xstate';
import { IndependentTrustee } from './context';
import {
	CommonCardMachineContext,
	RemoveReasonProps,
} from '../common/interfaces';
import {
	returnToPreview,
	updateClickedButton,
} from '../common/machine/actions';

interface IndependentTrusteeStates {
	states: {
		preview: {};
		edit: {
			states: {
				regulator: {};
			};
		};
		remove: {
			states: {
				reason: {};
				confirm: {};
				deleted: {};
			};
		};
	};
}

type IndependentTrusteeEvents =
	| { type: 'COMPLETE'; value: boolean }
	| { type: 'EDIT_REGULATOR' }
	| { type: 'REMOVE' }
	| { type: 'CANCEL' }
	| { type: 'SAVE'; values?: any }
	| { type: 'BACK' }
	| { type: 'DELETE' }
	| { type: 'SELECT'; values?: RemoveReasonProps };

export interface IndependentTrusteeContext extends CommonCardMachineContext {
	independentTrustee: Partial<IndependentTrustee>;
}

const independentTrusteeMachine = Machine<
	IndependentTrusteeContext,
	IndependentTrusteeStates,
	IndependentTrusteeEvents
>({
	id: 'independent-trustee',
	initial: 'preview',
	context: {
		complete: false,
		remove: null,
		independentTrustee: {},
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
				EDIT_REGULATOR: {
					target: 'edit.regulator',
					actions: updateClickedButton(4),
				},
				COMPLETE: {
					actions: assign((_, event) => ({
						complete: event.value,
					})),
				},
			},
		},
		edit: {
			id: 'edit',
			initial: 'regulator',
			states: {
				regulator: {
					on: {
						SAVE: {
							target: '#preview',
							actions: assign((context, event) => ({
								independentTrustee: {
									...context.independentTrustee,
									appointedByRegulator:
										event.values.regulator === 'yes' ? true : false,
								},
							})),
						},
						CANCEL: '#preview',
						REMOVE: returnToPreview(2),
					},
				},
			},
		},
		remove: {
			id: 'remove',
			initial: 'reason',
			states: {
				reason: {
					on: {
						CANCEL: '#preview',
						SELECT: {
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

export default independentTrusteeMachine;
