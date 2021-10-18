import { I18nAddressLookup, i18n as AddressI18n } from '@tpr/forms';
import {
	I18nContactsView,
	I18nNameView,
	I18nRemoveViewReasonAndConfirm,
	defaultEmailErrorMessages,
	defaultPhoneErrorMessages,
	I18nPreviewViewCommonProps,
} from '../common/interfaces';

interface I18nTrusteePreviewView extends I18nPreviewViewCommonProps {
	buttonsAndHeadings: {
		remove: string;
		correspondenceAddress: string;
		companiesHouseNumber: string;
		contacts: string;
	};
}

export type TrusteeI18nProps = {
	address: I18nAddressLookup;
	contacts: I18nContactsView;
	name: I18nNameView;
	preview: I18nTrusteePreviewView;
	remove: I18nRemoveViewReasonAndConfirm;
	type: {
		title: string;
		subtitle: string;
		sectionTitle?: string;
		fields: {
			trusteeType: {
				labels: {
					memberNominated: string;
					employerAppointed: string;
					regulatorAppointed: string;
					other: string;
				};
			};
			isProfessionalTrustee: {
				labels: {
					isProfessionalTrusteeYes: string;
					isProfessionalTrusteeNo: string;
				};
			};
		};
		breadcrumbs: {
			link1: string;
			link2: string;
		};
	};
};

export const i18n: TrusteeI18nProps = {
	address: {
		title: 'What is this trustee’s address?',
		sectionTitle: 'Edit Trustee',
		...AddressI18n,
	},
	contacts: {
		title: 'Contact details for this trustee',
		subtitle:
			'Provide contact details for the trustee, not a third-party such as an administrator.',
		sectionTitle: 'Edit Trustee',
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
	name: {
		title: 'Name of trustee',
		sectionTitle: 'Edit Trustee',
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
	preview: {
		buttonsAndHeadings: {
			remove: 'Remove',
			correspondenceAddress: 'Correspondence address',
			companiesHouseNumber: 'Companies House Number',
			contacts: 'Contact details',
		},
		mainHeadingSubtitle: {
			main: 'Trustee',
		},
		statusText: {
			confirmed: 'Confirmed',
			unconfirmed: 'Unconfirmed',
		},
		checkboxLabel: "Confirm '__NAME__' is correct.",
	},
	remove: {
		confirm: {
			title: 'Are you sure you want to remove this trustee?',
			subtitle: "This can't be undone.",
			breadcrumbs: {
				link1: 'Remove this trustee',
				link2: 'Are you sure...?',
			},
			buttons: {
				remove: 'Remove this trustee',
				cancel: 'Cancel',
			},
		},
		reason: {
			title: 'Remove this trustee',
			subtitle: 'Why are you removing this trustee?',
			fields: {
				leftTheScheme: {
					label: 'They have left the scheme.',
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
	type: {
		title: 'Type of trustee',
		subtitle: 'Select the option that best describes the type of trustee.',
		sectionTitle: 'Edit Trustee',
		fields: {
			trusteeType: {
				labels: {
					memberNominated: 'Member-nominated trustee',
					employerAppointed: 'Employer-appointed trustee',
					regulatorAppointed: 'Regulator-appointed trustee',
					other: 'Other',
				},
			},
			isProfessionalTrustee: {
				labels: {
					isProfessionalTrusteeYes: 'Yes',
					isProfessionalTrusteeNo: 'No',
				},
			},
		},
		breadcrumbs: {
			link1: 'Name of the trustee',
			link2: 'Type of trustee',
		},
	},
};
