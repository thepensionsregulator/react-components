import { Machine } from 'xstate';

interface TrusteeStates {
	states: {
		preview: {};
		edit: {
			states: {
				trusteeName: {};
				trusteeType: {};
				trusteeWork: {};
				trusteeCompanyDetails: {
					states: {
						companySearch: {};
						postcodeSearch: {};
					};
				};
				trusteeContacts: {};
			};
		};
		remove: {
			states: {
				reason: {};
				confirm: {};
			};
		};
		// NOTE: NOTE SURE IF *complete* IS NEEDED?
		complete: {};
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
				EDIT_NAME: 'edit',
				EDIT_TYPE: 'edit.trusteeType',
				EDIT_WORK: 'edit.trusteeWork',
				EDIT_CONTACTS: 'edit.trusteeContacts',
				COMPLETE: 'complete',
				REMOVE: 'remove',
			},
		},
		edit: {
			initial: 'trusteeName',
			states: {
				trusteeName: {
					on: {
						CORRECT: 'trusteeType',
						SAVE: '#preview',
					},
				},
				trusteeType: {
					on: {
						CORRECT: 'trusteeWork',
						SAVE: '#preview',
						BACK: 'trusteeName',
					},
				},
				trusteeWork: {
					id: 'trusteeWork',
					on: {
						CORRECT: 'trusteeContacts',
						INCORRECT: 'trusteeCompanyDetails',
						SAVE: '#preview',
						BACK: 'trusteeType',
					},
				},
				trusteeCompanyDetails: {
					initial: 'companySearch',
					states: {
						companySearch: {
							on: {
								COMPLETE: '#trusteeWork',
								SAVE: '#preview',
							},
						},
						postcodeSearch: {
							on: {
								COMPLETE: '#trusteeWork',
								SAVE: '#preview',
							},
						},
					},
				},
				trusteeContacts: {
					on: {
						CORRECT: '#preview',
						BACK: 'trusteeWork',
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
						CONFIRM: '#complete',
						CANCEL: '#preview',
					},
				},
			},
		},
		complete: {
			id: 'complete',
			type: 'final',
		},
	},
});

export default trusteeMachine;
