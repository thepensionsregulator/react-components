import {
	I18nPreviewViewCommonProps,
	I18nRemoveViewReasonAndConfirm,
} from '../common/interfaces';

interface I18nIndependentTrusteePreviewView extends I18nPreviewViewCommonProps {
	buttonsAndHeadings: {
		remove: string;
		address: string;
		companiesHouseNumber: string;
		appointedByRegulator: string;
	};
}

export type IndependentTrusteeI18nProps = {
	preview: I18nIndependentTrusteePreviewView;
	regulator: {
		title: string;
		subtitle: string;
		sectionTitle?: string;
		fields: {
			appointedByRegulator: {
				labels: {
					isAppointedByRegulatorYes: string;
					isAppointedByRegulatorNo: string;
				};
			};
		};
	};
	remove: I18nRemoveViewReasonAndConfirm;
};

export const i18n: IndependentTrusteeI18nProps = {
	preview: {
		buttonsAndHeadings: {
			remove: 'Remove',
			address: 'Address',
			companiesHouseNumber: 'Companies House Number',
			appointedByRegulator: 'Appointed by the regulator',
		},
		mainHeadingSubtitle: {
			main: 'Professional / Independent Trustee',
		},
		statusText: {
			confirmed: 'Confirmed',
			unconfirmed: 'Unconfirmed',
		},
		checkboxLabel: "Confirm '__NAME__' is correct.",
	},
	regulator: {
		title: 'Was this trustee appointed to this scheme by the regulator?',
		subtitle: 'subtitle',
		sectionTitle: 'Edit Independent Trustee',
		fields: {
			appointedByRegulator: {
				labels: {
					isAppointedByRegulatorYes: 'Yes',
					isAppointedByRegulatorNo: 'No',
				},
			},
		},
	},
	remove: {
		confirm: {
			title: 'Are you sure you want to remove this trustee?',
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
