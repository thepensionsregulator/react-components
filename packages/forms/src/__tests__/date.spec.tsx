import { formSetup } from '../__mocks__/setup';
import { renderFields, validate } from '../index';
import { FieldProps } from '../renderFields';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

// TODO: write more test when there are clear specs for date input validation

describe('Date input', () => {
	test('is accessible', async () => {
		const fields: FieldProps[] = [
			{
				name: 'date-1',
				label: 'passport-expiry',
				hint: 'For example, 12 11 2007',
				type: 'date',
				required: true,
			},
		];
		const handleSubmit = jest.fn();
		const { container } = formSetup({
			render: renderFields(fields),
			validate: validate(fields),
			onSubmit: handleSubmit,
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('date fields accepts only numbers', () => {
		const fields: FieldProps[] = [
			{
				name: 'date-1',
				label: 'passport-expiry',
				hint: 'For example, 12 11 2007',
				type: 'date',
				required: true,
			},
		];
		const handleSubmit = jest.fn();
		const { container, form } = formSetup({
			render: renderFields(fields),
			validate: validate(fields),
			onSubmit: handleSubmit,
		});

		const dd = container.querySelector(
			'input[aria-label="dd-passport-expiry"]',
		);
		const mm = container.querySelector(
			'input[aria-label="mm-passport-expiry"]',
		);
		const yyyy = container.querySelector(
			'input[aria-label="yyyy-passport-expiry"]',
		);

		const submit = container.querySelector('button[type="submit"]');

		userEvent.type(dd, 'sss');
		userEvent.type(mm, 'eeee');
		userEvent.type(yyyy, 'something');

		userEvent.click(submit);

		expect(handleSubmit).toBeCalledTimes(1);
		expect(form.getState().values).toEqual({});
	});

	test('date fields are being rendered within the form and submits when data is correct', () => {
		const fields: FieldProps[] = [
			{
				name: 'date-1',
				label: 'passport-expiry',
				hint: 'For example, 12 11 2007',
				type: 'date',
				required: true,
			},
		];
		const handleSubmit = jest.fn();
		const { container, form } = formSetup({
			render: renderFields(fields),
			validate: validate(fields),
			onSubmit: handleSubmit,
		});

		const dd = container.querySelector(
			'input[aria-label="dd-passport-expiry"]',
		);
		const mm = container.querySelector(
			'input[aria-label="mm-passport-expiry"]',
		);
		const yyyy = container.querySelector(
			'input[aria-label="yyyy-passport-expiry"]',
		);

		expect(dd).toHaveAttribute('aria-label', 'dd-passport-expiry');
		expect(mm).toHaveAttribute('aria-label', 'mm-passport-expiry');
		expect(yyyy).toHaveAttribute('aria-label', 'yyyy-passport-expiry');
		expect(dd).toHaveAttribute('type', 'string');
		expect(mm).toHaveAttribute('type', 'string');
		expect(yyyy).toHaveAttribute('type', 'string');

		const submit = container.querySelector('button[type="submit"]');

		userEvent.type(dd, '20');
		userEvent.type(mm, '12');
		userEvent.type(yyyy, '2019');

		userEvent.click(submit);

		expect(handleSubmit).toBeCalledTimes(1);
		expect(form.getState().values).toMatchInlineSnapshot(`
		Object {
		  "date-1": "2019-12-20",
		}
	`);
	});

	test('date field errors when submitted with incorrect values or empty', () => {
		const fields: FieldProps[] = [
			{
				label: 'passport-expiry',
				hint: 'For example, 12 11 2007',
				name: 'date-1',
				type: 'date',
				required: true,
				error: 'This is a required field',
			},
		];
		const handleSubmit = jest.fn();
		const { container, form } = formSetup({
			render: renderFields(fields),
			validate: validate(fields),
			onSubmit: handleSubmit,
		});
		const submit = container.querySelector('button[type="submit"]');

		userEvent.click(submit);
		const formState = form.getState();

		expect(formState.hasValidationErrors).toBeTruthy();
		expect(formState.invalid).toBeTruthy();
		expect(formState.values).toEqual({});
		expect(formState.touched).toMatchInlineSnapshot(`
		Object {
		  "date-1": true,
		}
	`);
		expect(formState.errors).toMatchInlineSnapshot(`
Object {
  "date-1": "This is a required field",
}
`);
		expect(handleSubmit).toBeCalledTimes(0);
	});

	test('date fields render readonly', () => {
		const fields: FieldProps[] = [
			{
				name: 'date-1',
				label: 'passport-expiry',
				hint: 'For example, 12 11 2007',
				type: 'date',
				required: true,
				readOnly: true,
			},
		];
		const handleSubmit = jest.fn();
		const { container } = formSetup({
			render: renderFields(fields),
			validate: validate(fields),
			onSubmit: handleSubmit,
		});

		const dd = container.querySelector(
			'input[aria-label="dd-passport-expiry"]',
		);
		const mm = container.querySelector(
			'input[aria-label="mm-passport-expiry"]',
		);
		const yyyy = container.querySelector(
			'input[aria-label="yyyy-passport-expiry"]',
		);

		expect(dd).toHaveAttribute('readonly');
		expect(mm).toHaveAttribute('readonly');
		expect(yyyy).toHaveAttribute('readonly');
	});
});
