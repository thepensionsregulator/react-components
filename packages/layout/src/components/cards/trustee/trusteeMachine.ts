import { Machine, assign } from 'xstate';

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
			};
		};
	};
}

type TrusteeEvents = any;

export interface TrusteeContext {
	loading: boolean;
	complete: boolean;
	leftTheScheme: null | String;
	trustee: {
		schemeRoleId: string;
		//
		title: string;
		forename: string;
		surname: string;
		trusteeType: string;
		isProfessionalTrustee: boolean;
		//
		address: {
			addressLine1: string;
			addressLine2: string;
			addressLine3: string;
			postTown: string;
			postcode: string;
			county: string;
			countryId: string;
		};
		//
		telephoneNumber: string;
		emailAddress: string;
	};
}

const trusteeMachine = Machine<TrusteeContext, TrusteeStates, TrusteeEvents>({
	id: 'trustee',
	initial: 'preview',
	context: {
		loading: false,
		complete: false,
		leftTheScheme: null,
		trustee: {
			schemeRoleId: '',
			//
			title: '',
			forename: '',
			surname: '',
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
				countryId: '',
			},
			//
			telephoneNumber: '',
			emailAddress: '',
		},
	},
	states: {
		preview: {
			id: 'preview',
			on: {
				EDIT_TRUSTEE: 'edit.trustee.name',
				EDIT_ORG: 'edit.company.address',
				EDIT_CONTACTS: 'edit.contact.details',
				REMOVE: 'remove',
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
								REMOVE: '#remove',
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
								REMOVE: '#remove',
							},
						},
						save: saveTrustee('#preview'),
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
								CANCEL: '#preview',
								REMOVE: '#remove',
							},
						},
						save: saveTrustee('#preview'),
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
								CANCEL: '#preview',
								REMOVE: '#remove',
							},
						},
						save: saveTrustee('#preview'),
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
									leftTheScheme: event.date,
								};
							}),
						},
						EDIT_TRUSTEE: '#edit.trustee.name',
						CANCEL: '#preview',
					},
				},
				confirm: {
					on: {
						EDIT_TRUSTEE: '#edit.trustee.name',
						BACK: 'reason',
						CANCEL: '#preview',
					},
				},
			},
		},
	},
});

function saveTrustee(onErrorTarget: string) {
	return {
		invoke: {
			src: 'saveData',
			onDone: {
				target: '#preview',
				actions: assign((ctx: any, event: any) => ({
					loading: false,
					trustee: {
						...ctx.trustee,
						...event.data,
					},
				})),
			},
			onError: {
				target: onErrorTarget,
				actions: assign((ctx: any) => ({
					...ctx,
					loading: false,
				})),
			},
		},
	};
}

export default trusteeMachine;
