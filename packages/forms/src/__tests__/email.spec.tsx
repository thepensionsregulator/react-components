import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFInputEmail } from '../elements/email/email';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { CheckDescribedByTag } from '../utils/aria-describedByTest';

const wrongFormatMsg = 'Invalid email format';
const emptyFieldMsg = 'email cannot be empty';

describe('Email input', () => {
	test('is accessible', async () => {
		const { container } = formSetup({
			render: <FFInputEmail label="Email" testId="email-input" name="email" />,
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('values get captured correctly', async () => {
		const testId = 'email-input';
		const handleSubmit = jest.fn();
		const { getByText, getByTestId } = formSetup({
			render: <FFInputEmail label="Email" testId={testId} name="email" />,
			onSubmit: handleSubmit,
		});

		userEvent.type(getByTestId(testId), 'david.alekna@tpr.gov.uk');
		getByText('Submit').click();

		expect(getByTestId(testId)).toHaveValue('david.alekna@tpr.gov.uk');
	});

	test('should not accept invalid email address', async () => {
		const testId = 'email-input';
		const handleSubmit = jest.fn();
		const { getByText, getByTestId, form } = formSetup({
			render: <FFInputEmail label="Email" testId={testId} name="email" />,
			onSubmit: handleSubmit,
		});

		userEvent.type(getByTestId(testId), 'this is not an email address');
		getByText('Submit').click();

		expect(getByText(wrongFormatMsg)).toBeInTheDocument();
		expect(form.getState().valid).toBeFalsy();
	});

	test('accepts valid email', async () => {
		const testId = 'email-input';
		const handleSubmit = jest.fn();
		const { getByText, getByTestId, form } = formSetup({
			render: <FFInputEmail label="Email" testId={testId} name="email" />,
			onSubmit: handleSubmit,
		});

		userEvent.type(getByTestId(testId), 'david.alekna@tpr.gov.uk');
		getByText('Submit').click();

		expect(form.getState().valid).toBeTruthy();
	});

	test('renders readonly', () => {
		const { queryByTestId } = formSetup({
			render: <FFInputEmail testId="text-input" name="name" readOnly={true} />,
		});

		const label = queryByTestId('text-input');
		expect(label).toHaveAttribute('readonly');
	});

	test('has correct describedby tag when an error is shown', () => {
		const testId = 'email-input';
		const name = 'email';
		const hint = 'This explains how to complete the field';

		const handleSubmit = jest.fn();

		const { getByText, getByTestId } = formSetup({
			render: (
				<FFInputEmail
					label="Email"
					testId={testId}
					name={name}
					hint={hint}
					required={true}
				/>
			),
			onSubmit: handleSubmit,
		});

		const emailTest = getByTestId(testId);

		CheckDescribedByTag(getByText, emailTest, emptyFieldMsg, hint);
	});

	describe('custom error messages', () => {
		test('displaying custom error messages', () => {
			const testId = 'email-input';
			const errorEmptyValue = 'please provide an email address';
			const errorInvalidValue = 'this is not a valid email';
			const handleSubmit = jest.fn();
			const { getByText, form } = formSetup({
				render: (
					<FFInputEmail
						label="Email"
						testId={testId}
						name="email"
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
			const errorEmptyValue = 'please provide an email address';
			const errorInvalidValue = 'this is not a valid email';
			const handleSubmit = jest.fn();
			const { getByText, getByTestId, form } = formSetup({
				render: (
					<FFInputEmail
						label="Email"
						testId={testId}
						name="email"
						required={true}
						errorEmptyValue={errorEmptyValue}
						errorInvalidValue={errorInvalidValue}
					/>
				),
				onSubmit: handleSubmit,
			});

			userEvent.type(getByTestId(testId), 'david.alekna');
			getByText('Submit').click();

			expect(getByText(errorInvalidValue)).toBeInTheDocument();
			expect(form.getState().valid).toBeFalsy();
		});
	});
});
