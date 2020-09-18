export type EmployerI18nProps = {
	preview: {
		buttons: {
			one: string;
			two: string;
			three: string;
			four: string;
		};
		identifiers: {
			companiesHouseNo: string;
			registeredCharityNo: string;
			epsrNumber: string;
		};
		checkboxLabel: string;
	};
	type: {
		title: string;
		subtitle: string;
		fields: {
			employerType: {
				principal: {
					label: string;
					hint: string;
				};
				principalAndParticipating: {
					label: string;
					hint: string;
				};
				participating: {
					label: string;
					hint: string;
				};
			};
		};
	};
	statutory: {
		title: string;
		fields: {
			statutoryEmployer: {
				statutory: {
					label: string;
					hint: string;
				};
				nonStatutory: {
					label: string;
					hint: string;
				};
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
