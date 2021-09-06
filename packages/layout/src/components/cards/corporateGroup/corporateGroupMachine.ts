import { Machine, assign } from 'xstate';
import { CorporateGroup } from './context';
import { CommonCardMachineContext, RemoveReasonProps } from '../common/interfaces';
import { updateClickedButton, returnToPreview } from '../common/machine/actions';

interface CorporateGroupStates {
	states: {
		preview: {};
		edit: {
			states: {
				name: {};
				contacts: {};
				professional: {};
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

type CorporateGroupEvents =
	| { type: 'COMPLETE'; value: boolean }
	| { type: 'EDIT_NAME' }
	| { type: 'EDIT_CONTACTS' }
	| { type: 'EDIT_PROFESSIONAL' }
	| { type: 'REMOVE' }
	| { type: 'CANCEL' }
	| { type: 'SAVE'; values?: any }
	| { type: 'BACK' }
	| { type: 'DELETE' }
	| { type: 'SELECT'; values?: RemoveReasonProps };

export interface CorporateGroupContext extends CommonCardMachineContext {
	corporateGroup: Partial<CorporateGroup>;
}

const corporateGroupMachine = Machine<
	CorporateGroupContext,
	CorporateGroupStates,
	CorporateGroupEvents
>({
	id: 'corporate-group',
	initial: 'preview',
	context: {
		complete: false,
		remove: null,
		corporateGroup: {},
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
				EDIT_NAME: {
					target: 'edit.name',
					actions: updateClickedButton(4),
				},
				EDIT_PROFESSIONAL: {
					target: 'edit.professional',
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
			id: 'edit',
			initial: 'name',
			states: {
				name: {
					on: {
						SAVE: {
							target: 'contacts',
							actions: assign((context, event) => ({
								corporateGroup: {
									...context.corporateGroup,
									...event.values,
								},
							})),
						},
						CANCEL: '#preview',
						REMOVE: returnToPreview(2),
					},
				},
				contacts: {
					on: {
						SAVE: {
							target: '#preview',
							actions: assign((context, event) => ({
								corporateGroup: {
									...context.corporateGroup,
									...event.values,
								},
							})),
						},
						CANCEL: '#preview',
						REMOVE: returnToPreview(2),
					},
				},
				professional: {
					on: {
						SAVE: {
							target: '#preview',
							actions: assign((context, event) => ({
								corporateGroup: {
									...context.corporateGroup,
									directorIsProfessional:
										event.values.professional === 'yes' ? true : false,
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

export default corporateGroupMachine;
