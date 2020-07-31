export type ThirdPartyI18nProps = {
	preview: {
		buttons: {
			one: string;
			two: string;
			three: string;
		};
		checkboxLabel: string;
	};
	reference: {
		title: string;
		subtitle: string;
		fields: {
			insurerCompanyReference: {
				label: string;
				errorIfEmpty: string;
				errorIfTooShort: string;
				errorIfTooLong: string;
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

export const i18n: ThirdPartyI18nProps = {
	preview: {
		buttons: {
			one: 'Third Party Administrator',
			two: 'Remove',
			three: 'Address',
		},
		checkboxLabel: 'All details are correct.',
	},
	reference: {
		title: 'Reference details for this third party admin',
		subtitle: 'Provide reference details for the third party admin.',
		fields: {
			insurerCompanyReference: {
				label: 'Reference Number',
				errorIfEmpty:
					'Please provide reference number for the third party admin',
				errorIfTooShort: 'We require at least one letter',
				errorIfTooLong: 'Maximum length is 100 letters',
			},
		},
	},
	remove: {
		confirm: {
			breadcrumbs: {
				link1: 'Remove this third party admin',
				link2: 'Are you sure...?',
			},
			title: 'Are you sure you want to remove this third party admin?',
			dialog: {
				message1:
					'Removing an third party admin here does not absolve them of their legal responsabilities. You must ensure that all nescessary steps to administer their withdrawl or cessation have been carried out before proceeding.',
				message2: "This can't be undone.",
			},
			buttons: {
				remove: 'Remove third party admin',
				cancel: 'Cancel',
			},
		},
		date: {
			title: 'Remove this third party admin',
			fields: {
				confirm: {
					label:
						'I confirm this third party admin is no longer associated with the scheme.',
				},
				date: {
					label: 'Date the third party admin left the scheme',
					hint: 'For example, 31 3 2019',
					error: 'Cannot be left empty!',
				},
			},
			errors: {
				formIncomplete: 'Please confirm and fill in the date fields.',
				dateAddedBeforeEffectiveDate:
					'Date must be after the third party admin was added.',
				dateAddedInTheFuture: 'Date cannot be in the future.',
			},
		},
	},
};
