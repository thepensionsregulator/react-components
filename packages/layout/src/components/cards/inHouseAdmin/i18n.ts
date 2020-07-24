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
};
