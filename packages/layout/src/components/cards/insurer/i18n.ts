import {
	I18nPreviewViewCommonProps,
	I18nRemoveViewDateAndConfirm,
} from '../common/interfaces';

interface I18nInsurerPreviewView extends I18nPreviewViewCommonProps {
	buttonsAndHeadings: {
		remove: string;
		address: string;
		companiesHouseNumber: string;
		insurerReferenceNumber: string;
	};
}

export type InsurerI18nProps = {
	preview: I18nInsurerPreviewView;
	reference: {
		title: string;
		subtitle: string;
		sectionTitle?: string;
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

export const i18n: InsurerI18nProps = {
	preview: {
		buttonsAndHeadings: {
			remove: 'Remove',
			address: 'Address',
			companiesHouseNumber: 'Companies House Number',
			insurerReferenceNumber: 'Insurer reference number',
		},
		mainHeadingSubtitle: {
			main: 'Insurer administrator',
		},
		statusText: {
			confirmed: 'Confirmed',
			unconfirmed: 'Unconfirmed',
		},
		checkboxLabel: "Confirm '__NAME__' is correct.",
	},
	reference: {
		title: 'Reference details for this insurer',
		subtitle: 'Provide reference details for the insurer.',
		sectionTitle: 'Edit Insurer',
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
					'Removing an insurer here does not absolve them of their legal responsibilities. You must ensure that all necessary steps to administer their withdrawal or cessation have been carried out before proceeding.',
				message2: "This can't be undone.",
			},
			buttons: {
				remove: 'Remove insurer',
				cancel: 'Cancel',
			},
			iconFallbackText: 'Warning',
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
				confirmMissing: 'Confirm this employer is no longer associated',
				formIncomplete: 'Please confirm and fill in the date fields.',
				dateAddedBeforeEffectiveDate:
					'Date must be after the Insurer was added.',
				dateAddedInTheFuture: 'Date cannot be in the future.',
			},
		},
	},
};
