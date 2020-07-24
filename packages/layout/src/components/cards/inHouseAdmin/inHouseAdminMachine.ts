import { Machine, assign } from 'xstate';
import { InHouseAdminProps } from './context';

interface InHouseAdminStates {
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

type InHouseAdminEvents =
	| { type: 'COMPLETE'; value: boolean }
	| { type: 'EDIT_INSURER' }
	| { type: 'REMOVE' }
	| { type: 'CANCEL' }
	| { type: 'NEXT'; values?: any }
	| { type: 'SAVE'; values?: any }
	| { type: 'BACK' }
	| { type: 'DELETE' };

export interface InHouseAdminContext {
	complete: boolean;
	remove: { confirm: boolean; date: string } | null;
	inHouseAdmin: Partial<InHouseAdminProps>;
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
						SAVE: '#preview',
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
