import { Machine, assign } from 'xstate';
import { Employer } from './context';
import { CommonCardMachineContext } from '../common/interfaces';
import {
	updateClickedButton,
	returnToPreview,
} from '../common/machine/actions';

interface EmployerStates {
	states: {
		preview: {};
		employerType: {};
		remove: {
			states: {
				date: {};
				confirm: {};
				deleted: {};
			};
		};
	};
}

type EmployerEvents =
	| { type: 'CHANGE_TYPE' }
	| { type: 'REMOVE' }
	| { type: 'SAVE'; values?: any }
	| { type: 'CANCEL' }
	| { type: 'NEXT'; values?: any }
	| { type: 'BACK' }
	| { type: 'DELETE' }
	| { type: 'COMPLETE'; value: boolean };

export interface EmployerContext extends CommonCardMachineContext {
	employer: Partial<Employer>;
	showStatutoryEmployerSection: boolean;
}

const employerMachine = Machine<
	EmployerContext,
	EmployerStates,
	EmployerEvents
>({
	id: 'employer',
	initial: 'preview',
	context: {
		complete: false,
		showStatutoryEmployerSection: true,
		remove: null,
		employer: {},
		lastBtnClicked: null,
	},
	states: {
		preview: {
			id: 'preview',
			on: {
				CHANGE_TYPE: {
					target: '#employerType',
					actions: updateClickedButton(1),
				},
				REMOVE: {
					target: '#remove',
					actions: updateClickedButton(2),
				},
				COMPLETE: {
					actions: assign((_, event) => ({
						complete: event.value,
					})),
				},
			},
		},
		employerType: {
			id: 'employerType',
			on: {
				SAVE: {
					target: '#preview',
					actions: assign((context, event) => ({
						employer: {
							...context.employer,
							employerType: event.values.employerType,
							statutoryEmployer: event.values.statutoryEmployer,
						},
					})),
				},
				CANCEL: '#preview',
				CHANGE_TYPE: '#preview',
				REMOVE: returnToPreview(2),
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
						CHANGE_TYPE: returnToPreview(1),
						REMOVE: '#preview',
					},
				},
				confirm: {
					on: {
						CANCEL: '#preview',
						BACK: '#remove',
						DELETE: 'deleted',
						CHANGE_TYPE: returnToPreview(1),
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

export default employerMachine;
