export type InHouseAdminI18nProps = {
	preview: {
		buttons: {
			one: string;
			two: string;
			three: string;
			four: string;
		};
		checkboxLabel: string;
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
			fields: {
				postcode: {
					invalidError?: string;
				};
			},
			dropdown: {
				placeholder: string;
				link: string;
				error: string;
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
					emptyError?: string
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
	remove: {
		confirm: {
			breadcrumbs: {
				link1: string;
				link2: string;
			};
			title: string;
			dialog: {
				message1: string;
				message2: string;
			};
			buttons: {
				remove: string;
				cancel: string;
			};
		};
		date: {
			title: string;
			fields: {
				confirm: {
					label: string;
				};
				date: {
					label: string;
					hint: string;
					error: string;
				};
			};
			errors: {
				formIncomplete: string;
				dateAddedBeforeEffectiveDate: string;
				dateAddedInTheFuture: string;
			};
		};
	};
};

export const i18n: InHouseAdminI18nProps = {
	preview: {
		buttons: {
			one: 'In House Administrator',
			two: 'Remove',
			three: 'Address',
			four: 'Contact details',
		},
		checkboxLabel: 'All details are correct.',
	},
	name: {
		title: 'Name of in house administrator',
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
	address: {
		title: 'What is this in house admin’s address?',
		postcode: {
			button: 'Find Address',
			title: 'Postcode',
			link: 'Change',
			regExPattern: '^[a-z]{1,2}\\d[a-z\\d]?\\d?[a-z]{0,2}$',
		},
		auto: {
			title: 'Address',
			subtitle: "Find the in house admin's correspondence address",
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
			subtitle: 'Enter the in house admin’s correspondence address manually.',
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
		title: 'Contact details for this in house admin',
		subtitle: 'Provide contact details for the in house admin.',
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
	remove: {
		confirm: {
			breadcrumbs: {
				link1: 'Remove this in house admin',
				link2: 'Are you sure...?',
			},
			title: 'Are you sure you want to remove this in house admin?',
			dialog: {
				message1:
					'Removing an in house admin here does not absolve them of their legal responsabilities. You must ensure that all nescessary steps to administer their withdrawl or cessation have been carried out before proceeding.',
				message2: "This can't be undone.",
			},
			buttons: {
				remove: 'Remove in house admin',
				cancel: 'Cancel',
			},
		},
		date: {
			title: 'Remove this in house admin',
			fields: {
				confirm: {
					label:
						'I confirm this in house admin is no longer associated with the scheme.',
				},
				date: {
					label: 'Date the in house admin left the scheme',
					hint: 'For example, 31 3 2019',
					error: 'Cannot be left empty!',
				},
			},
			errors: {
				formIncomplete: 'Please confirm and fill in the date fields.',
				dateAddedBeforeEffectiveDate:
					'Date must be after the Employer was added.',
				dateAddedInTheFuture: 'Date cannot be in the future.',
			},
		},
	},
};
