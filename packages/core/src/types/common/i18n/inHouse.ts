export type InHouseAdminI18nProps = {
	preview: {
		buttons: {
			one: string;
			two: string;
			three: string;
			four: string;
		};
		checkboxLabel: string;
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
	address: {
		title: string;
		postcode: {
			title: string;
			link: string;
			button: string;
		};
		auto: {
			title: string;
			subtitle: string;
			dropdown: {
				placeholder: string;
				link: string;
				error: string;
			};
		};
		manual: {
			subtitle: string;
			fields: {
				addressLine1: {
					label: string;
					emptyError?: string;
					invalidError: string;
				};
				addressLine2: { label: string; error?: string };
				addressLine3: { label: string; error?: string };
				postTown: { label: string; error?: string };
				postcode: {
					label: string;
					invalidError?: string;
					emptyError?: string;
				};
				county: { label: string; error?: string };
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
	remove: {
		confirm: {
			breadcrumbs: {
				link1: string;
				link2: string;
			};
			title: string;
			dialog: {
				message1: string;
				message2: string;
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
