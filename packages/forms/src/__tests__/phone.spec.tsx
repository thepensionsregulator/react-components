import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFInputPhone } from '../elements/phone/phone';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

describe('Phone input', () => {
	test('is accessible', async () => {
		const { container } = formSetup({
			render: (
				<FFInputPhone label="Phone number" testId="phone-input" name="phone" />
			),
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('values get captured correctly', async () => {
		const testId = 'phone-input';
		const handleSubmit = jest.fn();
		const { getByText, getByTestId } = formSetup({
			render: (
				<FFInputPhone label="Phone number" testId={testId} name="phone" />
			),
			onSubmit: handleSubmit,
		});

		userEvent.type(getByTestId(testId), '07543 221 321');
		getByText('Submit').click();

		expect(getByTestId(testId)).toHaveValue('07543 221 321');
	});

	test('should not accept invalid numbers', async () => {
		const testId = 'phone-input';
		const handleSubmit = jest.fn();
		const { getByText, getByTestId, form } = formSetup({
			render: (
				<FFInputPhone label="Phone number" testId={testId} name="phone" />
			),
			onSubmit: handleSubmit,
		});

		userEvent.type(
			getByTestId(testId),
			'this is not a valid phone number address',
		);
		getByText('Submit').click();

		expect(form.getState().valid).toBeFalsy();
		expect(getByText('Invalid phone number')).toBeInTheDocument();
	});

	test('accepts only valid numbers', async () => {
		const testId = 'phone-input';
		const handleSubmit = jest.fn();
		const { getByText, getByTestId, form } = formSetup({
			render: (
				<FFInputPhone label="Phone number" testId={testId} name="phone" />
			),
			onSubmit: handleSubmit,
		});

		userEvent.type(getByTestId(testId), '07543 221 321');
		getByText('Submit').click();

		expect(form.getState().valid).toBeTruthy();
	});

	test('composes custom validation function', async () => {
		const testId = 'phone-input';
		const errorMessage = 'Must include tripple 7';
		const handleSubmit = jest.fn();
		const { getByText, getByTestId, queryByText, form } = formSetup({
			render: (
				<FFInputPhone
					label="Phone number"
					testId={testId}
					name="phone"
					validate={(phone) =>
						phone && phone.includes('777') ? undefined : errorMessage
					}
				/>
			),
			onSubmit: handleSubmit,
		});

		userEvent.type(getByTestId(testId), '07543 221 321');
		getByText('Submit').click();

		expect(queryByText(errorMessage)).toBeInTheDocument();
		expect(form.getState().valid).toBeFalsy();
	});
});
