import { FieldProps } from '@tpr/forms';

const fields: FieldProps[] = [
	{
		name: 'addressLine1',
		label: 'Address line 1',
		type: 'text',
		hint: 'First line of your home address',
		error: 'This is a required field',
		required: true,
		inputWidth: 6,
	},
	{
		name: 'addressLine2',
		label: 'Address line 2',
		type: 'text',
		error: 'This is a required field',
		required: true,
		inputWidth: 6,
	},
	{
		name: 'addressLine3',
		value: ' ',
		label: 'Address line 3',
		type: 'text',
		inputWidth: 6,
	},
	{
		name: 'postTown',
		label: 'City',
		type: 'text',
		required: true,
		inputWidth: 6,
	},
	{
		name: 'postcode',
		label: 'Postcode',
		type: 'text',
		error: 'This is a required field',
		required: true,
		inputWidth: 6,
	},
	{
		name: 'county',
		label: 'County',
		type: 'text',
		error: 'This is a required field',
		required: true,
		inputWidth: 6,
	},
];

export default fields;
