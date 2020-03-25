import { fireEvent, act } from '@testing-library/react';
import { formSetup } from '../__mocks__/setup';
import { validate } from '../utils/validation';
import { renderFields } from '../utils/forms';

// TODO: write more test when there are clear specs for date input validation

describe('Date', () => {
	test('date fields are being rendered within the form and submits when data is correct', () => {
		const fields = [
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
		expect(dd).toHaveAttribute('type', 'text');
		expect(mm).toHaveAttribute('type', 'text');
		expect(yyyy).toHaveAttribute('type', 'text');

		const submit = container.querySelector('button[type="submit"]');

		// NOTE
		// React throws an error because I change input by manipulating dom instead of
		// using functions to change input state.
		// TODO: FIX
		// act(() => {
		// 	result.current.onChangeDD(20)
		// 	result.current.onChangeMM(12)
		// 	result.current.onChangeYYYY(2019)
		// })

		fireEvent.change(dd, { target: { value: 20 } });
		fireEvent.change(mm, { target: { value: 12 } });
		fireEvent.change(yyyy, { target: { value: 2019 } });

		fireEvent.click(submit);

		expect(handleSubmit).toBeCalledTimes(1);
		expect(form.getState().values).toMatchInlineSnapshot(`
		Object {
		  "date-1": 2019-12-20T00:00:00.000Z,
		}
	`);
	});

	test('date field errors when submitted with incorrect values or empty', () => {
		const fields = [
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

		fireEvent.click(submit);
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
});
