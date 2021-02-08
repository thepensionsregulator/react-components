import { I18nRemoveReason } from '../common/interfaces';

export type IndependentTrusteeI18nProps = {
	preview: {
		buttons: {
			one: string;
			two: string;
			three: string;
			four: string;
		};
		statusText: {
			confirmed: string;
			unconfirmed: string;
		};
		checkboxLabel: string;
		trusteeType: string;
	};
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
	remove: {
		confirm: {
			title: string;
			subtitle: string;
			breadcrumbs: {
				link1: string;
				link2: string;
			};
			dialog: {
				message1: string;
			};
			buttons: {
				remove: string;
				cancel: string;
			};
		};
		reason: I18nRemoveReason;
	};
};

export const i18n: IndependentTrusteeI18nProps = {
	preview: {
		buttons: {
			one: 'Corporate Trustee',
			two: 'Remove',
			three: 'Address',
			four: 'Appointed by the regulator',
		},
		statusText: {
			confirmed: 'Confirmed',
			unconfirmed: 'Unconfirmed',
		},
		checkboxLabel: 'Confirm details are correct.',
		trusteeType: 'Professional / Independent Trustee',
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
				pristineDate:
					'Enter the date the trustee left the scheme.',
				dateAddedBeforeEffectiveDate:
					'Date must be after the Trustee was added.',
				dateAddedInTheFuture: 'Date cannot be in the future.',
			},
		},
	},
};
