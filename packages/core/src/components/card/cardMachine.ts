import { Machine } from 'xstate';

const cardMachine = Machine({
	id: 'card',
	initial: 'init',
	context: {
		complete: false,
		trustee: {
			// 1 name details form
			title: null,
			firstName: null,
			lastName: null,
			// 2 type details form
			type: null, // radio button option
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
		init: {
			on: {
				EDIT: 'edit',
				EDIT_TYPE: 'edit.trusteeType',
				EDIT_WORK: 'edit.trusteeWork',
				EDIT_CONTACTS: 'edit.trusteeContacts',
				COMPLETE: 'complete',
				REMOVE: 'complete',
			},
		},
		edit: {
			initial: 'trusteeName',
			states: {
				trusteeName: {
					on: {
						CORRECT: 'trusteeType',
					},
				},
				trusteeType: {
					on: {
						CORRECT: 'trusteeWork',
					},
				},
				trusteeWork: {
					on: {
						CORRECT: 'trusteeContacts',
						INCORRECT: 'trusteeCompanyDetails',
					},
				},
				trusteeCompanyDetails: {
					on: {
						COMPLETE: 'trusteeWork',
					},
				},
				trusteeContacts: {
					on: {
						COMPLETE: '#complete',
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

export default cardMachine;
