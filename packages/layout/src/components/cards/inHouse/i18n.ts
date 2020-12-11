export type InHouseAdminI18nProps = {
	address: {
		title: string;
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
	address: {
		title: 'What is this in house admin’s address?',
	},
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
					'Removing an in house admin here does not absolve them of their legal responsibilities. You must ensure that all necessary steps to administer their withdrawal or cessation have been carried out before proceeding.',
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
