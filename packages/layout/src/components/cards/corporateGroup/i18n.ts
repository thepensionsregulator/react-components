export type CorporateGroupI18nProps = {
	preview: {
		buttons: {
			one: string;
			two: string;
			three: string;
			four: string;
			five: string;
		};
		checkboxLabel: string;
		trusteeType: string;
	};
	name: {
		title: string;
		fields: {
			title: {
				label: string;
			};
			firstName: {
				label: string;
				error: string;
			};
			lastName: {
				label: string;
				error: string;
			};
		};
	};
	contacts: {
		title: string;
		subtitle: string;
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
		fields: {
			isProfessional: {
				labels: {
					isProfessionalYes: string;
					isProfessionalNo: string;
				};
			};
		};
		breadcrumbs: {
			link1: string;
			link2: string;
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
		reason: {
			title: string;
			subtitle: string;
			fields: {
				leftTheScheme: {
					label: string;
				};
				date: {
					label: string;
				};
				neverPartOfTheScheme: {
					label: string;
				};
			};
			errors: {
				pristine: string;
				dateAddedBeforeEffectiveDate: string;
				dateAddedInTheFuture: string;
			};
		};
	};
};

export const i18n: CorporateGroupI18nProps = {
	preview: {
		buttons: {
			one: 'Corporate Trustee',
			two: 'Remove',
			three: 'Address',
			four: 'Chair of board',
			five: 'Director(s) are Professional Trustee',
		},
		checkboxLabel: 'All details are correct',
		trusteeType: 'Corporate Group trustee',
	},
	name: {
		title: 'Name of the chair of the board',
		fields: {
			title: {
				label: 'Title',
			},
			firstName: {
				label: 'First name',
				error: 'field is required',
			},
			lastName: {
				label: 'Last name',
				error: 'field is required',
			},
		},
	},
	contacts: {
		title: 'Contact details for the chair of the board',
		subtitle: 'subtitle',
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
		fields: {
			isProfessional: {
				labels: {
					isProfessionalYes: 'Yes',
					isProfessionalNo: 'No',
				},
			},
		},
		breadcrumbs: {
			link1: 'Edit Corporate Trustee',
			link2: 'Professional Trustee?',
		},
	},
	remove: {
		confirm: {
			breadcrumbs: {
				link1: 'Remove this trustee',
				link2: 'Are you sure...?',
			},
			title: 'Are you sure you want to remove this corporate trustee?',
			dialog: {
				message1: "This can't be undone",
			},
			buttons: {
				remove: 'Remove Trustee',
				cancel: 'Cancel',
			},
		},
		reason: {
			title: 'Why are you removing this trustee?',
			subtitle: '',
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
