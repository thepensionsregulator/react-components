import {
	I18nPreviewViewCommonProps,
	I18nRemoveViewDateAndConfirm,
} from '../common/interfaces';

interface I18nThirdPartyPreviewView extends I18nPreviewViewCommonProps {
	buttonsAndHeadings: {
		remove: string;
		address: string;
		companiesHouseNumber: string;
	};
}

export type ThirdPartyI18nProps = {
	preview: I18nThirdPartyPreviewView;
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
	remove: I18nRemoveViewDateAndConfirm;
};

export const i18n: ThirdPartyI18nProps = {
	preview: {
		buttonsAndHeadings: {
			remove: 'Remove',
			address: 'Address',
			companiesHouseNumber: 'Companies House Number',
		},
		mainHeadingSubtitle: {
			main: 'Third Party Administrator',
		},
		statusText: {
			confirmed: 'Confirmed',
			unconfirmed: 'Unconfirmed',
		},
		checkboxLabel: "Confirm '__NAME__' is correct.",
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
					'Removing an third party admin here does not absolve them of their legal responsibilities. You must ensure that all necessary steps to administer their withdrawal or cessation have been carried out before proceeding.',
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
				confirmMissing: 'Confirm this employer is no longer associated',
				formIncomplete: 'Please confirm and fill in the date fields.',
				dateAddedBeforeEffectiveDate:
					'Date must be after the third party admin was added.',
				dateAddedInTheFuture: 'Date cannot be in the future.',
			},
		},
	},
};
