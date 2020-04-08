export default [
	{
		name: 'addressLine1',
		label: 'Address line 1',
		type: 'text',
		hint: 'First line of your home address',
		error: 'This is a required field',
		required: true,
	},
	{
		name: 'addressLine2',
		label: 'Address line 2',
		type: 'text',
		error: 'This is a required field',
		required: true,
	},
	{
		name: 'addressLine3',
		value: ' ',
		label: 'Address line 3',
		type: 'text',
	},
	{
		name: 'postTown',
		label: 'City',
		type: 'text',
		required: true,
	},
	{
		name: 'postcode',
		label: 'Postcode',
		type: 'text',
		error: 'This is a required field',
		required: true,
	},
	{
		name: 'county',
		label: 'County',
		type: 'text',
		error: 'This is a required field',
		required: true,
	},
];
