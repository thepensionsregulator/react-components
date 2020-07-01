export type EmployerI18nProps = {
	preview: {
		buttons: {
			one: string;
			two: string;
			three: string;
			four: string;
		};
		checkboxLabel: string;
	};
	type: {
		title: string;
		subtitle: string;
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
		};
	};
};

export const i18n: EmployerI18nProps = {
	preview: {
		buttons: {
			one: 'Employer type',
			two: 'Remove',
			three: 'Employer',
			four: 'Companies House number',
		},
		checkboxLabel: 'All details are correct.',
	},
	type: {
		title: 'Type of employer',
		subtitle:
			"A scheme can only have one principal employer at any point in time. Not all schemes will have a principal employer. If the employer type has defaulted to 'Participating’, but this employer is actually the principal employer, you will need to correct the employer recorded as principal before you can correct this employer.",
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
	remove: {
		confirm: {
			breadcrumbs: {
				link1: 'Remove this employer',
				link2: 'Are you sure...?',
			},
			title: 'Are you sure you want to remove this employer?',
			dialog: {
				message1:
					'Removing an employer here does not absolve them of their legal responsabilities. You must ensure that all nescessary steps to administer their withdrawl or cessation have been carried out before proceeding.',
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
		},
	},
};
