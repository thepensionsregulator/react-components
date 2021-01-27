import { I18nRemoveReason } from '../common/interfaces';
type PropertyFunction<T> = () => T;

export type CorporateGroupI18nProps = {
	preview: {
		buttons: {
			one: string;
			two: string;
			three: string;
			four: string;
			five: string;
		};
		statusText: {
			confirmed: string;
			unconfirmed: string;
		};
		checkboxLabel: string;
		trusteeType: string;
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
	contacts: {
		title: string;
		fields: {
			telephone: {
				label: string;
				error: string;
			};
			email: {
				label: string;
				error: string;
			};
		};
	};
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

export const i18n: CorporateGroupI18nProps = {
	preview: {
		buttons: {
			one: 'Corporate Trustee',
			two: 'Remove',
			three: 'Address',
			four: 'Chair of board',
			five: 'Director(s) are Professional Trustees',
		},
		statusText: {
			confirmed: 'Confirmed',
			unconfirmed: 'Unconfirmed',
		},
		checkboxLabel: 'Confirm details are correct.',
		trusteeType: 'Corporate Group trustee',
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
				error:
					'Enter a telephone number, like 0163 960 598 or +44 7700 900 359',
			},
			email: {
				label: 'Email address',
				error: 'Cannot be empty',
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
