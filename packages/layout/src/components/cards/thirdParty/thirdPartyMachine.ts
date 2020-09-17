import { Machine, assign } from 'xstate';
import { ThirdPartyProps } from './context';

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

export interface ThirdPartyContext {
	complete: boolean;
	remove: { confirm: boolean; date: string } | null;
	thirdParty: Partial<ThirdPartyProps>;
	preValidatedData?: boolean | null;
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
	},
	states: {
		preview: {
			id: 'preview',
			on: {
				REMOVE: '#remove',
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

export default thirdPartyMachine;
