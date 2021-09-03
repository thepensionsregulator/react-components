import { Machine, assign } from 'xstate';
import { Actuary } from './context';

interface ActuaryStates {
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

type ActuaryEvents =
	| { type: 'COMPLETE'; value: boolean }
	| { type: 'EDIT_CONTACTS' }
	| { type: 'EDIT_NAME' }
	| { type: 'REMOVE' }
	| { type: 'CANCEL' }
	| { type: 'NEXT'; values?: any }
	| { type: 'SAVE'; values?: any }
	| { type: 'BACK' }
	| { type: 'DELETE' };

export interface ActuaryContext {
	complete: boolean;
	remove: { confirm: boolean; date: string } | null;
	actuary: Partial<Actuary>;
	preValidatedData?: boolean | null;
	lastBtnClicked?: number | null;
}

const updateClickedButton = (btn: number) => {
	return assign((__, _) => ({
		lastBtnClicked: btn,
	}));
};

const returnToPreview = (btnClicked: number) => {
	return {
		target: '#preview',
		actions: updateClickedButton(btnClicked),
	};
};

const actuaryMachine = Machine<ActuaryContext, ActuaryStates, ActuaryEvents>({
	id: 'actuary',
	initial: 'preview',
	context: {
		complete: false,
		remove: null,
		actuary: {},
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
								actuary: {
									...context.actuary,
									...event.values,
								},
							})),
						},
						CANCEL: '#preview',
						EDIT_NAME: returnToPreview(1),
						REMOVE: returnToPreview(2),
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
						REMOVE: returnToPreview(2),
					},
				},
				confirm: {
					on: {
						CANCEL: '#preview',
						BACK: '#remove',
						DELETE: 'deleted',
						EDIT_NAME: returnToPreview(1),
						REMOVE: returnToPreview(2),
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
