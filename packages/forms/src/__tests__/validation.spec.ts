import { finalFormValidationMock } from '../__mocks__/validation';

describe('form validation', () => {
	test('should accept `error` key with value `string` and return it if there was no value', () => {
		const response = finalFormValidationMock([
			{
				name: 'username',
				error: 'should have a username',
				value: '',
			},
			{
				name: 'title',
				error: 'title is required',
				value: 'Mr',
			},
		]);

		expect(response).toMatchInlineSnapshot(`
		Object {
		  "username": "should have a username",
		}
	`);
	});

	test('should accept `error` key with `function` that evaluates to error message or undefined', () => {
		const emailValidation = email => {
			return email.includes('@')
				? undefined
				: 'it doesn`t appear to be the correct email address';
		};

		const response = finalFormValidationMock([
			{
				name: 'username',
				error: 'should have a username',
				value: '',
			},
			{
				name: 'email',
				error: emailValidation,
				value: 'somefakeemail.com',
			},
			{
				name: 'email2',
				error: emailValidation,
				value: 'correct@email.com',
			},
			{
				name: 'title',
				error: 'title is required',
				value: 'Mr',
			},
		]);

		expect(response).toMatchInlineSnapshot(`
		Object {
		  "email": "it doesn\`t appear to be the correct email address",
		  "username": "should have a username",
		}
	`);
	});
});
