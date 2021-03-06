import { I18nAddressLookup, i18n as AddressI18n } from '@tpr/forms';
import {
	I18nRemoveReason,
	InputErrorMessages,
	defaultEmailErrorMessages,
	defaultPhoneErrorMessages,
} from '../common/interfaces';
type PropertyFunction<T> = () => T;

export type TrusteeI18nProps = {
	address: I18nAddressLookup;
	contacts: {
		title: string;
		subtitle: string;
		sectionTitle?: string;
		fields: {
			telephone: {
				label: string;
				error: InputErrorMessages;
			};
			email: {
				label: string;
				error: InputErrorMessages;
			};
		};
	};
	name: {
		title: string;
		sectionTitle?: string;
		fields: {
			title: {
				label: string;
				error: string | PropertyFunction<string | undefined>;
				maxlength: number;
			};
			firstName: {
				label: string;
				error: string | PropertyFunction<string | undefined>;
				maxlength: number;
			};
			lastName: {
				label: string;
				error: string | PropertyFunction<string | undefined>;
				maxlength: number;
			};
		};
	};
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
	};
	remove: {
		confirm: {
			title: string;
			subtitle: string;
			breadcrumbs: {
				link1: string;
				link2: string;
			};
			buttons: {
				remove: string;
				cancel: string;
			};
		};
		reason: I18nRemoveReason;
	};
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
		buttons: {
			one: 'Trustee',
			two: 'Remove',
			three: 'Correspondence address',
			four: 'Contact details',
		},
		statusText: {
			confirmed: 'Confirmed',
			unconfirmed: 'Unconfirmed',
		},
		checkboxLabel: 'Confirm details are correct.',
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
