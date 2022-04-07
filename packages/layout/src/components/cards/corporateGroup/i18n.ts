import {
	I18nNameView,
	I18nContactsView,
	I18nRemoveViewReasonAndConfirm,
	defaultEmailErrorMessages,
	defaultPhoneErrorMessages,
	I18nPreviewViewCommonProps,
} from '../common/interfaces';

interface I18nCorporateGroupPreviewView extends I18nPreviewViewCommonProps {
	buttonsAndHeadings: {
		remove: string;
		address: string;
		companiesHouseNumber: string;
		chairOfBoard: string;
		directorProfessional: string;
	};
}

export type CorporateGroupI18nProps = {
	preview: I18nCorporateGroupPreviewView;
	name: I18nNameView;
	contacts: I18nContactsView;
	professional: {
		title: string;
		subtitle: string;
		sectionTitle?: string;
		fields: {
			isProfessional: {
				labels: {
					isProfessionalYes: string;
					isProfessionalNo: string;
				};
			};
		};
	};
	remove: I18nRemoveViewReasonAndConfirm;
};

export const i18n: CorporateGroupI18nProps = {
	preview: {
		buttonsAndHeadings: {
			remove: 'Remove',
			address: 'Address',
			companiesHouseNumber: 'Companies House Number',
			chairOfBoard: 'Chair of board',
			directorProfessional: 'Director(s) are Professional Trustees',
		},
		mainHeadingSubtitle: {
			main: 'Corporate Group trustee',
		},
		statusText: {
			confirmed: 'Confirmed',
			unconfirmed: 'Unconfirmed',
		},
		checkboxLabel: "Confirm '__NAME__' is correct.",
	},
	name: {
		title: 'Name of the chair of the board',
		sectionTitle: 'Edit Corporate Trustee',
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
		title: 'Contact details for the chair of the board',
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
	professional: {
		title:
			'Are any of the directors  of this corporate trustee a professional trustee?',
		subtitle: 'subtitle',
		sectionTitle: 'Edit Corporate Trustee',
		fields: {
			isProfessional: {
				labels: {
					isProfessionalYes: 'Yes',
					isProfessionalNo: 'No',
				},
			},
		},
	},
	remove: {
		confirm: {
			title: 'Are you sure you want to remove this corporate trustee?',
			subtitle: "This can't be undone.",
			breadcrumbs: {
				link1: 'Remove this trustee',
				link2: 'Are you sure...?',
			},
			dialog: {
				message1: "This can't be undone",
			},
			buttons: {
				remove: 'Remove Trustee',
				cancel: 'Cancel',
			},
			iconFallbackText: 'Warning',
		},
		reason: {
			title: 'Remove this trustee',
			subtitle: 'Why are you removing this trustee?',
			fields: {
				leftTheScheme: {
					label: 'They have left the scheme',
				},
				date: {
					label: 'Date the trustee left the scheme',
				},
				neverPartOfTheScheme: {
					label: 'They were never part of the scheme.',
				},
			},
			errors: {
				pristine: 'Select a reason for removing the trustee.',
				pristineDate: 'Enter the date the trustee left the scheme.',
				dateAddedBeforeEffectiveDate:
					'Date must be after the Trustee was added.',
				dateAddedInTheFuture: 'Date cannot be in the future.',
			},
		},
	},
};
