import { Machine, assign } from 'xstate';
import {
	CardAddress,
	CardPersonalDetails,
	CardContactDetails,
	CommonCardMachineContext,
} from '../common/interfaces';
import {
	updateClickedButton,
	returnToPreview,
} from '../common/machine/actions';

interface TrusteeStates {
	states: {
		preview: {};
		edit: {
			states: {
				trustee: {
					states: {
						name: {};
						kind: {};
						save: {};
					};
				};
				company: {
					states: {
						address: {};
						save: {};
					};
				};
				contact: {
					states: {
						details: {};
						save: {};
					};
				};
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

type TrusteeEvents =
	| { type: 'EDIT_TRUSTEE' }
	| { type: 'EDIT_ORG' }
	| { type: 'EDIT_CONTACTS' }
	| { type: 'REMOVE' }
	| { type: 'COMPLETE' }
	| { type: 'NEXT' }
	| { type: 'CANCEL' }
	| { type: 'SAVE'; address?: Partial<CardAddress>; values?: any }
	| { type: 'BACK' }
	| {
			type: 'SELECT';
			values?: {
				reason: null | string;
				date: null | string;
			};
	  }
	| { type: 'DELETE' };

export interface TrusteeProps extends CardPersonalDetails, CardContactDetails {
	schemeRoleId: string;
	//
	trusteeType: string;
	isProfessionalTrustee: boolean;
	//
	address: Partial<CardAddress>;
	//
	[key: string]: any;
}

export interface TrusteeContext extends CommonCardMachineContext {
	loading: boolean;
	trustee: TrusteeProps;
	openSection: string;
}

const trusteeMachine = Machine<TrusteeContext, TrusteeStates, TrusteeEvents>({
	id: 'trustee',
	initial: 'preview',
	context: {
		loading: false,
		complete: false,
		openSection: '',
		trustee: {
			schemeRoleId: '',
			//
			title: '',
			firstName: '',
			lastName: '',
			trusteeType: '',
			isProfessionalTrustee: false,
			//
			address: {
				addressLine1: '',
				addressLine2: '',
				addressLine3: '',
				postTown: '',
				postcode: '',
				county: '',
			},
			//
			telephoneNumber: '',
			emailAddress: '',
		},
		remove: null,
		lastBtnClicked: null,
	},
	states: {
		preview: {
			id: 'preview',
			on: {
				EDIT_TRUSTEE: {
					target: 'edit.trustee.name',
					actions: updateClickedButton(1),
				},
				REMOVE: {
					target: '#remove',
					actions: updateClickedButton(2),
				},
				EDIT_ORG: {
					target: 'edit.company.address',
					actions: assign((context, _event) => {
						return {
							openSection: (context.openSection = 'edit.address'),
							lastBtnClicked: 3,
						};
					}),
				},
				EDIT_CONTACTS: {
					target: 'edit.contact.details',
					actions: assign((context, _event) => {
						return {
							openSection: (context.openSection = 'edit.contact'),
							lastBtnClicked: 4,
						};
					}),
				},
				COMPLETE: {
					actions: assign((_: any, event: any) => ({
						complete: event.value,
					})),
				},
			},
		},
		edit: {
			id: 'edit',
			initial: 'trustee',
			states: {
				trustee: {
					initial: 'name',
					states: {
						name: {
							id: 'name',
							on: {
								NEXT: {
									target: 'kind',
									actions: assign((context: any, event: any) => ({
										trustee: {
											...context.trustee,
											...event.values,
										},
									})),
								},
								CANCEL: '#preview',
								EDIT_TRUSTEE: '#preview',
								REMOVE: returnToPreview(2),
							},
						},
						kind: {
							on: {
								SAVE: {
									target: 'save',
									actions: assign((context, event) => ({
										loading: true,
										trustee: {
											...context.trustee,
											...event.values,
										},
									})),
								},
								BACK: 'name',
								CANCEL: '#preview',
								EDIT_TRUSTEE: '#preview',
								REMOVE: returnToPreview(2),
							},
						},
						save: saveTrustee('onDetailsSave', 'kind'),
					},
				},
				company: {
					initial: 'address',
					states: {
						address: {
							id: 'address',
							on: {
								SAVE: {
									target: 'save',
									actions: assign((context, event) => ({
										loading: true,
										trustee: {
											...context.trustee,
											address: event.address,
										},
									})),
								},
								CANCEL: {
									target: '#preview',
									actions: assign((context, _event) => {
										return {
											openSection: (context.openSection = ''),
										};
									}),
								},
								EDIT_TRUSTEE: returnToPreview(1),
								REMOVE: returnToPreview(2),
							},
						},
						save: saveTrustee('onAddressSave', 'address'),
					},
				},
				contact: {
					initial: 'details',
					states: {
						details: {
							on: {
								SAVE: {
									target: 'save',
									actions: assign((context, event) => ({
										loading: true,
										trustee: {
											...context.trustee,
											...event.values,
										},
									})),
								},
								CANCEL: {
									target: '#preview',
									actions: assign((context, _event) => {
										return {
											openSection: (context.openSection = ''),
										};
									}),
								},
								EDIT_TRUSTEE: returnToPreview(1),
								REMOVE: returnToPreview(2),
							},
						},
						save: saveTrustee('onContactSave', 'details'),
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
						SELECT: {
							target: 'confirm',
							actions: assign((_, event) => {
								return {
									remove: event.values,
								};
							}),
						},
						CANCEL: '#preview',
						EDIT_TRUSTEE: returnToPreview(1),
						REMOVE: '#preview',
					},
				},
				confirm: {
					on: {
						BACK: 'reason',
						CANCEL: '#preview',
						DELETE: 'deleted',
						EDIT_TRUSTEE: returnToPreview(1),
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

function saveTrustee(
	onSaveFunctionName: 'onContactSave' | 'onAddressSave' | 'onDetailsSave',
	targetOnError: string,
) {
	if (!onSaveFunctionName) {
		throw Error('saveTrustee function doesn`t have a prop name');
	}
	return {
		invoke: {
			id: onSaveFunctionName,
			src: onSaveFunctionName,
			onDone: {
				target: '#preview',
				actions: assign({
					loading: false,
				}),
			},
			onError: {
				target: targetOnError,
				actions: assign({
					loading: false,
				}),
			},
		},
	};
}

export default trusteeMachine;
