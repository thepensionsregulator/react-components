import { Machine, assign } from 'xstate';
import { IndependentTrustee } from './context';
import { RemoveReasonProps } from '../common/interfaces';

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

export interface IndependentTrusteeContext {
	complete: boolean;
	remove?: RemoveReasonProps;
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
	},
	states: {
		preview: {
			id: 'preview',
			on: {
				REMOVE: '#remove',
				EDIT_REGULATOR: 'edit.regulator',
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
						REMOVE: '#remove',
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

export default independentTrusteeMachine;
