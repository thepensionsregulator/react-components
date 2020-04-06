import { Machine, assign } from 'xstate';

interface TrusteeStates {
	states: {
		preview: {};
		edit: {
			states: {
				trustee: {
					states: {
						name: {};
						type: {};
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
	name: string;
	trusteeType: string;
	professional: boolean;
	address: string;
	addressLineOne: string;
	addressLineTwo: string;
	addressLineThree: string;
	city: string;
	postCode: string;
	companyPhone: string;
	companyEmail: string;
	companiesHouseNumber: string;
}

const trusteeMachine = Machine<TrusteeContext, TrusteeStates, TrusteeEvents>({
	id: 'trustee',
	initial: 'preview',
	context: {
		complete: false,
		//
		name: '',
		trusteeType: '',
		professional: false,
		address: '',
		addressLineOne: '',
		addressLineTwo: '',
		addressLineThree: '',
		city: '',
		postCode: '',
		companyPhone: '',
		companyEmail: '',
		companiesHouseNumber: '',
	},
	states: {
		preview: {
			id: 'preview',
			on: {
				EDIT_TRUSTEE: 'edit.trustee.name',
				EDIT_ORG: 'edit.companyAddress',
				EDIT_CONTACTS: 'edit.trusteeContacts',
				REMOVE: 'remove',
			},
		},
		edit: {
			initial: 'trustee',
			states: {
				trustee: {
					initial: 'name',
					states: {
						name: {
							on: {
								NEXT: {
									target: 'type',
									actions: assign((_, event) => ({
										name: event.name,
									})),
								},
							},
						},
						type: {
							on: {
								SAVE: {
									target: '#preview',
									actions: assign((context, event) => ({
										...context,
										...event.values,
									})),
								},
								BACK: 'name',
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
							actions: assign((context, event) => ({
								...context,
								...event.values,
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
