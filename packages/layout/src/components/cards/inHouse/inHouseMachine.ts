import { Machine, assign } from 'xstate';
import { CommonCardMachineContext } from '../common/interfaces';
import {
	updateClickedButton,
	returnToPreview,
} from '../common/machine/actions';
import { InHouseAdmin } from './context';

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
	| { type: 'EDIT_CONTACTS' }
	| { type: 'EDIT_NAME' }
	| { type: 'EDIT_ADDRESS' }
	| { type: 'REMOVE' }
	| { type: 'CANCEL' }
	| { type: 'NEXT'; values?: any }
	| { type: 'SAVE'; values?: any }
	| { type: 'BACK' }
	| { type: 'DELETE' };

export interface InHouseAdminContext extends CommonCardMachineContext {
	inHouseAdmin: Partial<InHouseAdmin>;
}

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
		lastBtnClicked: null,
	},
	states: {
		preview: {
			id: 'preview',
			on: {
				EDIT_NAME: {
					target: 'edit.name',
					actions: updateClickedButton(1),
				},
				REMOVE: {
					target: '#remove',
					actions: updateClickedButton(2),
				},
				EDIT_ADDRESS: {
					target: 'edit.address',
					actions: updateClickedButton(3),
				},
				EDIT_CONTACTS: {
					target: 'edit.contacts',
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
						EDIT_NAME: '#preview',
						REMOVE: returnToPreview(2),
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
						EDIT_NAME: returnToPreview(1),
						REMOVE: returnToPreview(2),
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
						EDIT_NAME: returnToPreview(1),
						REMOVE: returnToPreview(2),
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
						EDIT_NAME: returnToPreview(1),
						REMOVE: '#preview',
					},
				},
				confirm: {
					on: {
						CANCEL: '#preview',
						BACK: '#remove',
						DELETE: 'deleted',
						EDIT_NAME: returnToPreview(1),
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

export default inHouseAdminMachine;
