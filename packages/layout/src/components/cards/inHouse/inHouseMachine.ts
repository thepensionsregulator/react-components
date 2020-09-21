import { Machine, assign } from 'xstate';
import { InHouseAdminContext } from '@tpr/core';

interface InHouseAdminStates {
	states: {
		preview: {};
		edit: {
			states: {
				name: {};
				address: {};
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

type InHouseAdminEvents =
	| { type: 'COMPLETE'; value: boolean }
	| { type: 'EDIT_INSURER' }
	| { type: 'EDIT_CONTACTS' }
	| { type: 'EDIT_NAME' }
	| { type: 'EDIT_ADDRESS' }
	| { type: 'REMOVE' }
	| { type: 'CANCEL' }
	| { type: 'NEXT'; values?: any }
	| { type: 'SAVE'; values?: any }
	| { type: 'BACK' }
	| { type: 'DELETE' };

const inHouseAdminMachine = Machine<
	InHouseAdminContext,
	InHouseAdminStates,
	InHouseAdminEvents
>({
	id: 'inHouseAdmin',
	initial: 'preview',
	context: {
		complete: false,
		remove: null,
		inHouseAdmin: {},
	},
	states: {
		preview: {
			id: 'preview',
			on: {
				REMOVE: '#remove',
				EDIT_INSURER: 'edit',
				EDIT_CONTACTS: 'edit.contacts',
				EDIT_NAME: 'edit.name',
				EDIT_ADDRESS: 'edit.address',
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
								inHouseAdmin: {
									...context.inHouseAdmin,
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
								inHouseAdmin: {
									...context.inHouseAdmin,
									...event.values,
								},
							})),
						},
						CANCEL: '#preview',
						REMOVE: '#remove',
					},
				},
				address: {
					on: {
						SAVE: {
							target: '#preview',
							actions: assign((context, event) => ({
								inHouseAdmin: {
									...context.inHouseAdmin,
									address: event.values,
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

export default inHouseAdminMachine;
