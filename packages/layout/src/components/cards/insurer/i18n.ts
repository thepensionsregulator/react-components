import { InsurerI18nProps } from '@tpr/core';

export const i18n: InsurerI18nProps = {
	preview: {
		buttons: {
			one: 'Insurer administrator',
			two: 'Remove',
			three: 'Address',
			four: 'Contact details',
			five: 'Insurer reference number',
		},
		checkboxLabel: 'All details are correct.',
	},
	reference: {
		title: 'Reference details for this insurer',
		subtitle: 'Provide reference details for the insurer.',
		fields: {
			insurerCompanyReference: {
				label: 'Reference Number',
				errorIfEmpty: 'Please provide reference number for the insurer',
				errorIfTooShort: 'We require at least one letter',
				errorIfTooLong: 'Maximum length is 100 letters',
			},
		},
	},
	remove: {
		confirm: {
			breadcrumbs: {
				link1: 'Remove this insurer',
				link2: 'Are you sure...?',
			},
			title: 'Are you sure you want to remove this insurer?',
			dialog: {
				message1:
					'Removing an insurer here does not absolve them of their legal responsabilities. You must ensure that all nescessary steps to administer their withdrawl or cessation have been carried out before proceeding.',
				message2: "This can't be undone.",
			},
			buttons: {
				remove: 'Remove insurer',
				cancel: 'Cancel',
			},
		},
		date: {
			title: 'Remove this insurer',
			fields: {
				confirm: {
					label:
						'I confirm this insurer is no longer associated with the scheme.',
				},
				date: {
					label: 'Date the insurer left the scheme',
					hint: 'For example, 31 3 2019',
					error: 'Cannot be left empty!',
				},
			},
			errors: {
				formIncomplete: 'Please confirm and fill in the date fields.',
				dateAddedBeforeEffectiveDate:
					'Date must be after the Insurer was added.',
				dateAddedInTheFuture: 'Date cannot be in the future.',
			},
		},
	},
};
