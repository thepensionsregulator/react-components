import { IndependentTrusteeI18nProps } from '@tpr/core';

export const i18n: IndependentTrusteeI18nProps = {
	preview: {
		buttons: {
			one: 'Corporate Trustee',
			two: 'Remove',
			three: 'Address',
			four: 'Appointed by the regulator',
		},
		checkboxLabel: 'All details are correct.',
		trusteeType: 'Professional / Independent Trustee',
	},
	regulator: {
		title: 'Was this trustee appointed to this scheme by the regulator?',
		subtitle: 'subtitle',
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
				pristine: 'Please select one of the options',
				dateAddedBeforeEffectiveDate:
					'Date must be after the Trustee was added.',
				dateAddedInTheFuture: 'Date cannot be in the future.',
			},
		},
	},
};
