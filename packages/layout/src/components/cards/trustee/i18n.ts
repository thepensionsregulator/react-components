import { I18nRemoveReason } from '../common/interfaces';

export type TrusteeI18nProps = {
	address: {
		title: string;
		postcode: {
			title: string;
			link: string;
			button: string;
			regExPattern?: string;
		};
		auto: {
			title: string;
			subtitle: string;
			dropdown: {
				placeholder: string;
				link: string;
				error: string;
			};
			fields: {
				postcode: {
					invalidError?: string;
				};
			};
		};
		manual: {
			subtitle: string;
			fields: {
				addressLine1: {
					label: string;
					emptyError?: string;
					invalidError: string;
				};
				addressLine2: { label: string; error?: string };
				addressLine3: { label: string; error?: string };
				postTown: {
					label: string;
					emptyError?: string;
				};
				postcode: {
					label: string;
					invalidError?: string;
					emptyError?: string;
				};
				county: { label: string; error?: string };
			};
		};
	};
	contacts: {
		title: string;
		subtitle: string;
		fields: {
			telephone: {
				label: string;
				error: string;
			};
			email: {
				label: string;
				error: string;
			};
		};
	};
	name: {
		title: string;
		fields: {
			title: {
				label: string;
			};
			firstName: {
				label: string;
				error: string;
			};
			lastName: {
				label: string;
				error: string;
			};
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
		reason: I18nRemoveReason;
	};
	type: {
		title: string;
		subtitle: string;
		fields: {
			trusteeType: {
				labels: {
					memberNominated: string;
					employerAppointed: string;
					regulatorAppointed: string;
					other: string;
				};
			};
			isProfessionalTrustee: {
				labels: {
					isProfessionalTrusteeYes: string;
					isProfessionalTrusteeNo: string;
				};
			};
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
			regExPattern: '^[a-z]{1,2}\\d[a-z\\d]?\\d?[a-z]{0,2}$',
		},
		auto: {
			title: 'Address',
			subtitle: "Find the trustee's correspondence address",
			fields: {
				postcode: {
					invalidError: 'Incorrect postcode format',
				},
			},
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
				addressLine1: {
					label: 'Address line 1',
					emptyError: 'This is a required field',
					invalidError: 'Must be at least 2 chars',
				},
				addressLine2: { label: 'Address line 2' },
				addressLine3: { label: 'Address line 3' },
				postTown: {
					label: 'City',
					emptyError: 'This is a required field',
				},
				postcode: {
					label: 'Postcode',
					emptyError: 'This is a required field',
					invalidError: 'Incorrect postcode format',
				},
				county: {
					label: 'County',
					error: 'This is a required field',
				},
			},
		},
	},
	contacts: {
		title: 'Contact details for this trustee',
		subtitle:
			'Provide contact details for the trustee, not a third-party such as an administrator.',
		fields: {
			telephone: {
				label: 'Telephone number',
				error:
					'Enter a telephone number, like 0163 960 598 or +44 7700 900 359',
			},
			email: {
				label: 'Email address',
				error: 'Cannot be empty',
			},
		},
	},
	name: {
		title: 'Name of trustee',
		fields: {
			title: {
				label: 'Title',
			},
			firstName: {
				label: 'First name',
				error: 'field is required',
			},
			lastName: {
				label: 'Last name',
				error: 'field is required',
			},
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
				leftTheScheme: {
					label: 'They have left the scheme.',
				},
				date: {
					label: 'Date the trustee left the scheme',
				},
				neverPartOfTheScheme: {
					label: 'They were never part of the scheme.',
				},
			},
			errors: {
				pristine:
					'Please select one of the options and fill in required fields.',
				dateAddedBeforeEffectiveDate:
					'Date must be after the Trustee was added.',
				dateAddedInTheFuture: 'Date cannot be in the future.',
			},
		},
	},
	type: {
		title: 'Type of trustee',
		subtitle: 'Select the option that best describes the type of trustee.',
		fields: {
			trusteeType: {
				labels: {
					memberNominated: 'Member-nominated trustee',
					employerAppointed: 'Employer-appointed trustee',
					regulatorAppointed: 'Regulator-appointed trustee',
					other: 'Other',
				},
			},
			isProfessionalTrustee: {
				labels: {
					isProfessionalTrusteeYes: 'Yes',
					isProfessionalTrusteeNo: 'No',
				},
			},
		},
		breadcrumbs: {
			link1: 'Name of the trustee',
			link2: 'Type of trustee',
		},
	},
};
