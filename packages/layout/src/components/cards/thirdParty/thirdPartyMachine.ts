import { Machine, assign } from 'xstate';
import { ThirdPartyProps } from './context';
import { CommonCardMachineContext } from '../common/interfaces';
import { updateClickedButton } from '../common/machine/actions';

interface ThirdPartyStates {
	states: {
		preview: {};
		remove: {
			states: {
				date: {};
				confirm: {};
				deleted: {};
			};
		};
	};
}

type ThirdPartyEvents =
	| { type: 'COMPLETE'; value: boolean }
	| { type: 'REMOVE' }
	| { type: 'CANCEL' }
	| { type: 'NEXT'; values?: any }
	| { type: 'BACK' }
	| { type: 'DELETE' };

export interface ThirdPartyContext extends CommonCardMachineContext {
	thirdParty: Partial<ThirdPartyProps>;
}

const thirdPartyMachine = Machine<
	ThirdPartyContext,
	ThirdPartyStates,
	ThirdPartyEvents
>({
	id: 'thirdParty',
	initial: 'preview',
	context: {
		complete: false,
		remove: null,
		thirdParty: {},
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
				COMPLETE: {
					actions: assign((_, event) => ({
						complete: event.value,
					})),
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

export default thirdPartyMachine;
