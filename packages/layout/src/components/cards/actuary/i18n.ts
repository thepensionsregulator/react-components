import {
	InputErrorMessages,
	defaultEmailErrorMessages,
	defaultPhoneErrorMessages,
} from '../common/interfaces';
type PropertyFunction<T> = () => T;

export type ActuaryI18nProps = {
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
	remove: {
		confirm: {
			breadcrumbs: {
				link1: string;
				link2: string;
			};
			title: string;
			dialog: {
				message1: string;
			};
			buttons: {
				remove: string;
				cancel: string;
			};
		};
		date: {
			title: string;
			fields: {
				confirm: {
					label: string;
				};
				date: {
					label: string;
					hint: string;
					error: string;
				};
			};
			errors: {
				formIncomplete: string;
				dateAddedBeforeEffectiveDate: string;
				dateAddedInTheFuture: string;
			};
		};
	};
};

export const i18n: ActuaryI18nProps = {
	preview: {
		buttons: {
			one: 'Actuary',
			two: 'Remove',
			three: 'Address',
			four: 'Contact details',
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
