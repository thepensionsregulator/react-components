import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFInputPhone } from '../elements/phone/phone';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { CheckDescribedByTag } from '../utils/aria-describedByTest';

const wrongFormatMsg = 'Invalid phone number format';
const emptyFieldMsg = 'phone number cannot be empty';

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
		expect(getByText(wrongFormatMsg)).toBeInTheDocument();
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

	test('renders readonly', () => {
		const { queryByTestId } = formSetup({
			render: <FFInputPhone testId="text-input" name="name" readOnly={true} />,
		});

		const label = queryByTestId('text-input');
		expect(label).toHaveAttribute('readonly');
	});

	test('has correct describedby tag when an error is shown', () => {
		const testId = 'phoneTest';
		const name = 'phoneNumber';
		const hint = 'This explains how to complete the field';

		const handleSubmit = jest.fn();
		const { getByTestId, getByText } = formSetup({
			render: (
				<FFInputPhone
					label="Phone Number"
					testId={testId}
					name={name}
					hint={hint}
					required={true}
				/>
			),
			onSubmit: handleSubmit,
		});

		const phoneTest = getByTestId(testId);
		CheckDescribedByTag(getByText, phoneTest, emptyFieldMsg, hint);
	});

	describe('custom error messages', () => {
		test('displaying custom error messages', () => {
			const testId = 'email-input';
			const errorEmptyValue = 'please provide a phone number';
			const errorInvalidValue = 'this is not a valid phone number';
			const handleSubmit = jest.fn();
			const { getByText, form } = formSetup({
				render: (
					<FFInputPhone
						label="Phone Number"
						testId={testId}
						name="phoneNumber"
						required={true}
						errorEmptyValue={errorEmptyValue}
						errorInvalidValue={errorInvalidValue}
					/>
				),
				onSubmit: handleSubmit,
			});

			getByText('Submit').click();

			expect(getByText(errorEmptyValue)).toBeInTheDocument();
			expect(form.getState().valid).toBeFalsy();
		});

		test('displaying custom error messages', () => {
			const testId = 'email-input';
			const errorEmptyValue = 'please provide a phone number';
			const errorInvalidValue = 'this is not a valid phone number';
			const handleSubmit = jest.fn();
			const { getByText, getByTestId, form } = formSetup({
				render: (
					<FFInputPhone
						label="Phone Number"
						testId={testId}
						name="phoneNumber"
						required={true}
						errorEmptyValue={errorEmptyValue}
						errorInvalidValue={errorInvalidValue}
					/>
				),
				onSubmit: handleSubmit,
			});

			userEvent.type(getByTestId(testId), '234');
			getByText('Submit').click();

			expect(getByText(errorInvalidValue)).toBeInTheDocument();
			expect(form.getState().valid).toBeFalsy();
		});
	});
});
