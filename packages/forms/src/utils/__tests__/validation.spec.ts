import { validate } from '../validation';

describe('form validation', () => {
	test('validate function should output correct errors', () => {
		const fields = [
			{
				name: 'firstName',
				type: 'text',
				label: 'First Name',
				value: '',
				error: 'Cannot be empty 1',
				required: true,
			},
			{
				name: 'lastName',
				type: 'text',
				label: 'Last Name',
				value: 'kasndlksad',
				error: 'Cannot be empty 2',
				required: false,
			},
		];

		const keyValuePairs = fields.reduce(
			(acc, field) => ({
				...acc,
				[field.name]: field.value,
			}),
			{},
		);

		const fieldsValidation = validate(fields);

		expect(fieldsValidation(keyValuePairs)).toEqual({
			[fields[0].name]: fields[0].error,
		});
	});
});
