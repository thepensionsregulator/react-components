import { Machine, assign } from 'xstate';

interface TrusteeStates {
	states: {
		preview: {};
		edit: {
			states: {
				trustee: {
					states: {
						trusteeName: {};
						trusteeType: {};
					};
				};
				companyAddress: {};
				trusteeCompanyDetails: {};
				trusteeContacts: {};
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
	complete: boolean;
	//
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
}

const trusteeMachine = Machine<TrusteeContext, TrusteeStates, TrusteeEvents>({
	id: 'trustee',
	initial: 'preview',
	context: {
		complete: false,
		//
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
	states: {
		preview: {
			id: 'preview',
			on: {
				EDIT_TRUSTEE: 'edit.trustee.trusteeName',
				EDIT_ORG: 'edit.companyAddress',
				EDIT_CONTACTS: 'edit.trusteeContacts',
				REMOVE: 'remove',
			},
		},
		edit: {
			initial: 'trustee',
			states: {
				trustee: {
					initial: 'trusteeName',
					states: {
						trusteeName: {
							id: 'trusteeName',
							on: {
								NEXT: {
									target: 'trusteeType',
									actions: assign((context: any, event: any) => ({
										...context,
										...event.values,
									})),
								},
							},
						},
						trusteeType: {
							on: {
								SAVE: {
									target: '#preview',
									actions: assign((context, event) => ({
										...context,
										...event.values,
									})),
								},
								BACK: 'trusteeName',
							},
						},
					},
				},
				companyAddress: {
					id: 'companyAddress',
					on: {
						INCORRECT: 'trusteeCompanyDetails',
						SAVE: {
							target: '#preview',
							actions: assign((_, event) => ({
								address: event.values,
							})),
						},
					},
				},
				trusteeCompanyDetails: {
					on: {
						COMPLETE: '#companyAddress',
					},
				},
				trusteeContacts: {
					on: {
						SAVE: {
							target: '#preview',
							actions: assign((context, event) => ({
								...context,
								...event.values,
							})),
						},
					},
				},
			},
		},
		remove: {
			initial: 'reason',
			states: {
				reason: {
					on: {
						SELECT: 'confirm',
						CANCEL: '#preview',
					},
				},
				confirm: {
					on: {
						CANCEL: '#preview',
					},
				},
			},
		},
	},
});

export default trusteeMachine;
