import {
	defaultEmailErrorMessages,
	defaultPhoneErrorMessages,
	I18nNameView,
	I18nRemoveViewDateAndConfirm,
	I18nPreviewViewCommonProps,
	I18nContactsView,
} from '../common/interfaces';

interface I18nActuaryPreviewView extends I18nPreviewViewCommonProps {
	buttonsAndHeadings: {
		remove: string;
		address: string;
		companiesHouseNumber: string;
		contacts: string;
	}
}

export type ActuaryI18nProps = {
	preview: I18nActuaryPreviewView;
	name: I18nNameView;
	contacts: I18nContactsView;
	remove: I18nRemoveViewDateAndConfirm;
};

export const i18n: ActuaryI18nProps = {
	preview: {
		buttonsAndHeadings: {
			remove: 'Remove',
			address: 'Address',
			companiesHouseNumber: 'Companies House Number',
			contacts: 'Contact details',
		},
		mainHeadingSubtitle: {
			main: 'Scheme Actuary',
		},
		statusText: {
			confirmed: 'Confirmed',
			unconfirmed: 'Unconfirmed',
		},
		checkboxLabel: "Confirm '__NAME__' is correct.",
	},
	name: {
		title: 'Name of Actuary',
		sectionTitle: 'Edit Actuary',
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
		title: 'Contact details for this actuary',
		subtitle: 'Provide contact details for the actuary.',
		sectionTitle: 'Edit Actuary',
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
				link1: 'Remove this actuary',
				link2: 'Are you sure...?',
			},
			title: 'Are you sure you want to remove this actuary?',
			dialog: {
				message1: "This can't be undone.",
			},
			buttons: {
				remove: 'Remove actuary',
				cancel: 'Cancel',
			},
		},
		date: {
			title: 'Remove this actuary',
			fields: {
				confirm: {
					label:
						'I confirm this actuary is no longer associated with the scheme.',
				},
				date: {
					label: 'Date the actuary left the scheme',
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
