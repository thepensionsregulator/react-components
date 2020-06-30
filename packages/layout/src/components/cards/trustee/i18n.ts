export type TrusteeI18nProps = {
	address: {
		title: string;
		postcode: {
			title: string;
			link: string;
			button: string;
		};
		auto: {
			title: string;
			subtitle: string;
			dropdown: {
				placeholder: string;
				link: string;
				error: string;
			};
		};
		manual: {
			subtitle: string;
			fields: {
				addressLine1: string;
				addressLine2: string;
				addressLine3: string;
				postTown: string;
				postcode: string;
				county: string;
			};
		};
	};
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
			lastName: string;
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
		confirm: {
			title: string;
			subtitle: string;
			breadcrumbs: {
				link1: string;
				link2: string;
			};
			buttons: {
				remove: string;
				cancel: string;
			};
		};
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

export const i18n: TrusteeI18nProps = {
	address: {
		title: 'What is this trustee’s address?',
		postcode: {
			button: 'Find Address',
			title: 'Postcode',
			link: 'Change',
		},
		auto: {
			title: 'Address',
			subtitle: "Find the trustee's correspondence address",
			dropdown: {
				placeholder: 'Please select the address from the dropdown',
				link: "I can't find my address in the list",
				error:
					'Please select one of the address from the dropdown menu. If you cannot find your address, please click the link below to enter it manually.',
			},
		},
		manual: {
			subtitle: 'Enter the trustee’s correspondence address manually.',
			fields: {
				addressLine1: 'Address line 1',
				addressLine2: 'Address line 2',
				addressLine3: 'Address line 3',
				postTown: 'City',
				postcode: 'Postcode',
				county: 'County',
			},
		},
	},
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
		confirm: {
			title: 'Are you sure you want to remove this trustee?',
			subtitle: "This can't be undone.",
			breadcrumbs: {
				link1: 'Remove this trustee',
				link2: 'Are you sure...?',
			},
			buttons: {
				remove: 'Remove this trustee',
				cancel: 'Cancel',
			},
		},
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
