export type EmployerI18nProps = {
	preview: {
		buttons: {
			one: string;
			two: string;
			three: string;
			four: string;
		};
		identifiers: {
			companiesHouseNo: string;
			registeredCharityNo: string;
			epsrNumber: string;
		};
		statusText: {
			confirmed: string;
			unconfirmed: string;
		};
		checkboxLabel: string;
	};
	type: {
		title: string;
		subtitle: string;
		sectionTitle?: string;
		fields: {
			employerType: {
				principal: {
					label: string;
					hint: string;
				};
				principalAndParticipating: {
					label: string;
					hint: string;
				};
				participating: {
					label: string;
					hint: string;
				};
			};
		};
	};
	statutory: {
		title: string;
		fields: {
			statutoryEmployer: {
				statutory: {
					label: string;
					hint: string;
				};
				nonStatutory: {
					label: string;
					hint: string;
				};
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

export const i18n: EmployerI18nProps = {
	preview: {
		buttons: {
			one: 'Employer type',
			two: 'Remove',
			three: 'Employer',
			four: 'Employer Identifiers',
		},
		identifiers: {
			companiesHouseNo: 'Companies House number',
			registeredCharityNo: 'Registered Charity number',
			epsrNumber: 'Employer Pension Scheme Reference number',
		},
		statusText: {
			confirmed: 'Confirmed',
			unconfirmed: 'Unconfirmed',
		},
		checkboxLabel: "Confirm '__NAME__' is correct.",
	},
	type: {
		title: 'Type of employer',
		subtitle:
			"A scheme can only have one principal employer at any point in time. Not all schemes will have a principal employer. If the employer type has defaulted to 'Participating’, but this employer is actually the principal employer, you will need to correct the employer recorded as principal before you can correct this employer.",
		sectionTitle: 'Edit Employer',
		fields: {
			employerType: {
				principal: {
					label: 'Principal',
					hint:
						"The employer who is named in the scheme's latest trust deed and rules and any subsequently amending deeds and usually has powers, eg the power to appoint trustees, amend the scheme rules or wind up the scheme.",
				},
				principalAndParticipating: {
					label: 'Principal and participating employer',
					hint:
						'An employer who is the principal employer but also has employees who can participate in the scheme.',
				},
				participating: {
					label: 'Participating',
					hint: 'Any employer whose employees can participate in the scheme.',
				},
			},
		},
	},
	statutory: {
		title: 'Is this employer a statutory employer?',
		fields: {
			statutoryEmployer: {
				statutory: {
					label: 'Statutory Employer',
					hint: 'Statutory copy text goes here',
				},
				nonStatutory: {
					label: 'Non-statutory Employer',
					hint: 'Non-statutory copy text goes here',
				},
			},
		},
	},
	remove: {
		confirm: {
			breadcrumbs: {
				link1: 'Remove this employer',
				link2: 'Are you sure...?',
			},
			title: 'Are you sure you want to remove this employer?',
			dialog: {
				message1:
					'Removing an employer here does not absolve them of their legal responsibilities. You must ensure that all necessary steps to administer their withdrawal or cessation have been carried out before proceeding.',
				message2: "This can't be undone.",
			},
			buttons: {
				remove: 'Remove employer',
				cancel: 'Cancel',
			},
		},
		date: {
			title: 'Remove this employer',
			fields: {
				confirm: {
					label:
						'I confirm this employer is no longer associated with the scheme.',
				},
				date: {
					label: 'Date the employer left the scheme',
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
