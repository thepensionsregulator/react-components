import { Machine } from 'xstate';

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
	complete?: boolean;
	trustee: {
		title: string;
		firstName: string;
		lastName: string;
		trusteeType: string;
		isProfesional: boolean;
	};
	company: {
		name: string;
		line1: string;
		line2: string;
		city: string;
		county: string;
		postCode: string;
	};
	contact: {
		phoneNumber: string;
		emailAddress: string;
	};
}

const trusteeMachine = Machine<TrusteeContext, TrusteeStates, TrusteeEvents>({
	id: 'trustee',
	initial: 'preview',
	context: {
		complete: false,
		trustee: {
			// 1 name details form
			title: '',
			firstName: '',
			lastName: '',
			// 2 type details form
			trusteeType: '', // radio button option
			isProfesional: false, // select box 1/2
		},
		// 3 who does this trustee work for
		company: {
			name: '',
			line1: '',
			line2: '',
			city: '',
			county: '',
			postCode: '',
		},
		// 4 contact details for this trustee
		contact: {
			phoneNumber: '',
			emailAddress: '',
		},
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
								NEXT: 'type',
							},
						},
						type: {
							on: {
								SAVE: '#preview',
								BACK: 'name',
							},
						},
					},
				},
				companyAddress: {
					id: 'companyAddress',
					on: {
						INCORRECT: 'trusteeCompanyDetails',
						SAVE: '#preview',
					},
				},
				trusteeCompanyDetails: {
					on: {
						COMPLETE: '#companyAddress',
					},
				},
				trusteeContacts: {
					on: {
						SAVE: '#preview',
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
