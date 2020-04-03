export default [
	{
		name: 'addressLineOne',
		label: 'Address line 1',
		type: 'text',
		hint: 'First line of your home address',
		error: 'This is a required field',
		required: true,
	},
	{
		name: 'addressLineTwo',
		label: 'Address line 2',
		type: 'text',
		error: 'This is a required field',
		required: true,
	},
	{
		name: 'addressLineThree',
		label: 'Address line 3',
		type: 'text',
	},
	{
		name: 'addressLineFour',
		label: 'Address line 4',
		type: 'text',
	},
	{
		name: 'city',
		label: 'City',
		type: 'text',
		required: true,
	},
	{
		name: 'postCode',
		label: 'Postcode',
		type: 'text',
		error: 'This is a required field',
		required: true,
	},
	{
		name: 'country',
		label: 'Country',
		type: 'text',
		error: 'This is a required field',
		required: true,
	},
];
