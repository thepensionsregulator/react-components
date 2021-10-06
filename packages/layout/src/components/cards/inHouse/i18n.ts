import { I18nAddressLookup, i18n as AddressI18n } from '@tpr/forms';
import {
	defaultEmailErrorMessages,
	defaultPhoneErrorMessages,
	I18nNameView,
	I18nContactsView,
	I18nRemoveViewDateAndConfirm,
	I18nPreviewViewCommonProps,
} from '../common/interfaces';

interface I18nInHouseAdminPreviewView extends I18nPreviewViewCommonProps {
	buttonsAndHeadings: {
		remove: string;
		address: string;
		contacts: string;
	};
}

export type InHouseAdminI18nProps = {
	address: I18nAddressLookup;
	preview: I18nInHouseAdminPreviewView;
	name: I18nNameView;
	contacts: I18nContactsView;
	remove: I18nRemoveViewDateAndConfirm;
};

export const i18n: InHouseAdminI18nProps = {
	address: {
		title: 'What is this in house admin’s address?',
		sectionTitle: 'Edit In House Administrator',
		...AddressI18n,
	},
	preview: {
		buttonsAndHeadings: {
			remove: 'Remove',
			address: 'Address',
			contacts: 'Contact details',
		},
		mainHeadingSubtitle: {
			main: 'In House Administrator',
		},
		statusText: {
			confirmed: 'Confirmed',
			unconfirmed: 'Unconfirmed',
		},
		checkboxLabel: "Confirm '__NAME__' is correct.",
	},
	name: {
		title: 'Name of in house administrator',
		sectionTitle: 'Edit In House Administrator',
		fields: {
			title: {
				label: 'Title',
				error: undefined,
				maxlength: 35,
			},
			firstName: {
				label: 'First name',
				error: 'field is required',
				maxlength: 70,
			},
			lastName: {
				label: 'Last name',
				error: 'field is required',
				maxlength: 70,
			},
		},
	},
	contacts: {
		title: 'Contact details for this in house admin',
		subtitle: 'Provide contact details for the in house admin.',
		sectionTitle: 'Edit In House Administator',
		fields: {
			telephone: {
				label: 'Telephone number',
				error: defaultPhoneErrorMessages,
			},
			email: {
				label: 'Email address',
				error: defaultEmailErrorMessages,
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
