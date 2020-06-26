// TODO
// remove - confirm
// address - auto
// address - manual

export type i18nProps = {
	address: object;
	contacts: {
		title: string;
		subtitle: string;
		fields: {
			telephone: string;
			email: string;
		};
	};
	name: {
		title: string;
		fields: {
			title: string;
			firstName: string;
			lastName;
		};
	};
	preview: {
		buttons: {
			one: string;
			two: string;
			three: string;
			four: string;
		};
		checkboxLabel: string;
		statuses: {
			complete: string;
			incomplete: string;
		};
	};
	remove: {
		confirm: object;
		reason: {
			title: string;
			subtitle: string;
			fields: {
				leftTheScheme: string;
				date: string;
				neverPartOfTheScheme: string;
			};
		};
	};
	type: {
		title: string;
		subtitle: string;
		fields: {
			memberNominated: string;
			employerAppointed: string;
			regulatorAppointed: string;
			isProfessionalTrusteeYes: string;
			isProfessionalTrusteeNo: string;
		};
		breadcrumbs: {
			link1: string;
			link2: string;
		};
	};
};

export const i18n: i18nProps = {
	address: {},
	contacts: {
		title: 'Contact details for this trustee',
		subtitle:
			'Provide contact details for the trustee, not a third-party such as an administrator.',
		fields: {
			telephone: 'Telephone number',
			email: 'Email address',
		},
	},
	name: {
		title: 'Name of trustee',
		fields: {
			title: 'Title',
			firstName: 'First name',
			lastName: 'Last name',
		},
	},
	preview: {
		buttons: {
			one: 'Trustee',
			two: 'Remove',
			three: 'Correspondence address',
			four: 'Contact details',
		},
		checkboxLabel: 'All details are correct.',
		statuses: {
			complete: 'No issues',
			incomplete: 'Incomplete',
		},
	},
	remove: {
		confirm: {},
		reason: {
			title: 'Remove this trustee',
			subtitle: 'Why are you removing this trustee?',
			fields: {
				leftTheScheme: 'They have left the scheme.',
				date: 'Date the trustee left the scheme',
				neverPartOfTheScheme: 'They were never part of the scheme.',
			},
		},
	},
	type: {
		title: 'Type of trustee',
		subtitle: 'Select the option that best describes the type of trustee.',
		fields: {
			memberNominated: 'Member-nominated trustee',
			employerAppointed: 'Employer-appointed trustee',
			regulatorAppointed: 'Regulator-appointed trustee',
			isProfessionalTrusteeYes: 'Yes',
			isProfessionalTrusteeNo: 'No',
		},
		breadcrumbs: {
			link1: 'Name of the trustee',
			link2: 'Type of trustee',
		},
	},
};
