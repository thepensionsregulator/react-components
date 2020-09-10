import { Machine, assign } from 'xstate';
import { CorporateGroup } from './context';
import { RemoveReasonProps } from '../common/interfaces';

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

export interface CorporateGroupContext {
	complete: boolean;
	remove?: RemoveReasonProps;
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
	},
	states: {
		preview: {
			id: 'preview',
			on: {
				REMOVE: '#remove',
				EDIT_NAME: 'edit.name',
				EDIT_CONTACTS: 'edit.contacts',
				EDIT_PROFESSIONAL: 'edit.professional',
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
						REMOVE: '#remove',
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
						REMOVE: '#remove',
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

export default corporateGroupMachine;
