import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFInputPhone } from '../elements/phone/phone';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { CheckDescribedByTag } from '../utils/aria-describedByTest';

const phoneWrongFormatMsg = 'Invalid phone number format';
const phoneEmptyFieldMsg = 'phone number cannot be empty';
const phoneTestId = 'phone-input';
const phoneName = 'phoneNumber';
const phoneLabel = 'Phone number';
const phoneHint = 'This explains how to complete the phone number field';
const customErrorEmptyValue = 'please provide a phone number';
const customErrorInvalidValue = 'this is not a valid phone number';

const basicProps = {
	hint: phoneHint,
	label: phoneLabel,
	name: phoneName,
	testId: phoneTestId,
};

const handleSubmit = jest.fn();

describe('Phone input', () => {
	describe('rendering', () => {
		test('renders correctly', () => {
			const { queryByTestId } = formSetup({
				render: <FFInputPhone {...basicProps} />,
			});

			const input = queryByTestId(phoneTestId);
			expect(input).toBeDefined();
			expect(input).not.toHaveAttribute('readonly');
			expect(input).not.toHaveAttribute('required');
		});
		test('renders readonly', () => {
			const { queryByTestId } = formSetup({
				render: <FFInputPhone {...basicProps} readOnly={true} />,
			});

			const input = queryByTestId(phoneTestId);
			expect(input).toHaveAttribute('readonly');
		});

		test('renders required attribute', () => {
			const { queryByTestId } = formSetup({
				render: <FFInputPhone {...basicProps} required={true} />,
			});

			const input = queryByTestId(phoneTestId);
			expect(input).toHaveAttribute('required');
		});
	});

	test('is accessible', async () => {
		const { container } = formSetup({
			render: <FFInputPhone {...basicProps} />,
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('values get captured correctly', async () => {
		const { getByText, getByTestId } = formSetup({
			render: <FFInputPhone {...basicProps} />,
			onSubmit: handleSubmit,
		});

		userEvent.type(getByTestId(phoneTestId), '07543 221 321');
		getByText('Submit').click();

		expect(getByTestId(phoneTestId)).toHaveValue('07543 221 321');
	});

	test('should not accept invalid numbers', async () => {
		const { getByText, getByTestId, form } = formSetup({
			render: <FFInputPhone {...basicProps} />,
			onSubmit: handleSubmit,
		});

		userEvent.type(
			getByTestId(phoneTestId),
			'this is not a valid phone number address',
		);
		getByText('Submit').click();

		expect(form.getState().valid).toBeFalsy();
		expect(getByText(phoneWrongFormatMsg)).toBeInTheDocument();
	});

	test('accepts only valid numbers', async () => {
		const { getByText, getByTestId, form } = formSetup({
			render: <FFInputPhone {...basicProps} />,
			onSubmit: handleSubmit,
		});

		userEvent.type(getByTestId(phoneTestId), '07543 221 321');
		getByText('Submit').click();

		expect(form.getState().valid).toBeTruthy();
	});

	test('has correct describedby tag when an error is shown', () => {
		const { getByTestId, getByText } = formSetup({
			render: <FFInputPhone {...basicProps} required={true} />,
			onSubmit: handleSubmit,
		});

		const phoneTest = getByTestId(phoneTestId);
		CheckDescribedByTag(getByText, phoneTest, phoneEmptyFieldMsg, phoneHint);
	});

	describe('custom error messages for Phone Number input', () => {
		test('Empty Value error message', () => {
			const { getByText, form } = formSetup({
				render: (
					<FFInputPhone
						{...basicProps}
						required={true}
						errorEmptyValue={customErrorEmptyValue}
						errorInvalidValue={customErrorInvalidValue}
					/>
				),
				onSubmit: handleSubmit,
			});

			getByText('Submit').click();

			expect(getByText(customErrorEmptyValue)).toBeInTheDocument();
			expect(form.getState().valid).toBeFalsy();
		});

		test('Invalid format error message', () => {
			const { getByText, getByTestId, form } = formSetup({
				render: (
					<FFInputPhone
						{...basicProps}
						required={true}
						errorEmptyValue={customErrorEmptyValue}
						errorInvalidValue={customErrorInvalidValue}
					/>
				),
				onSubmit: handleSubmit,
			});

			userEvent.type(getByTestId(phoneTestId), '234');
			getByText('Submit').click();

			expect(getByText(customErrorInvalidValue)).toBeInTheDocument();
			expect(form.getState().valid).toBeFalsy();
		});
	});
});
