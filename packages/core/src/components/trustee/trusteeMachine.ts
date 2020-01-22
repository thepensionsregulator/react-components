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
		complete: {};
	};
}

type TrusteeEvents = any;

interface TrusteeContext {
	complete: boolean;
	trustee: {
		title: string;
		firstName: string;
		lastName: string;
		type: string;
		isProfesional: boolean;
	};
	company: {
		name: string;
		address: string;
	};
	contact: {
		phone: string;
		email: string;
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
			type: '', // radio button option
			isProfesional: false, // select box 1/2
		},
		// 3 who does this trustee work for
		company: {
			name: '',
			address: '',
		},
		// 4 contact details for this trustee
		contact: {
			phone: '',
			email: '',
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
