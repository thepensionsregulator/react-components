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
};

export const i18n: InHouseAdminI18nProps = {
	preview: {
		buttons: {
			one: 'In House Administrator',
			two: 'Remove',
			three: 'Name and Address',
			four: 'Contact details',
		},
		checkboxLabel: 'All details are correct.',
	},
	contacts: {
		title: 'Contact details for this in house admin',
		subtitle: 'Provide contact details for the in house admin.',
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
};
