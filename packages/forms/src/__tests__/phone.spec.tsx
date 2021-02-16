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

	test('renders readonly', () => {
		const { queryByTestId } = formSetup({
			render: <FFInputPhone testId="text-input" name="name" readOnly={true} />,
		});

		const label = queryByTestId('text-input');
		expect(label).toHaveAttribute('readonly');
	});

	test('has correct describedby tag when an error is shown', () => {
		const numberRequired = 'Invalid phone number';
		const testId = 'phoneTest';

		const handleSubmit = jest.fn();
		const { getByTestId, queryByText } = formSetup({
			render: (
				<FFInputPhone
					label="Phone Number"
					testId={testId}
					name="phoneNumber"
					required={true}
					validate={(number) => (number ? undefined : numberRequired)}
				/>
			),
			onSubmit: handleSubmit,
		});

		getByTestId(testId).focus();
		getByTestId(testId).blur();

		const errorMessage = queryByText(numberRequired);
		expect(errorMessage).toBeInTheDocument();
		expect(errorMessage).toHaveAttribute('id', 'phoneNumber_error');
		expect(getByTestId(testId)).toHaveAttribute('aria-invalid', 'true');
		expect(getByTestId(testId)).toHaveAttribute(
			'aria-describedby',
			'phoneNumber_error',
		);
	});
});
