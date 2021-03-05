import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFInputEmail } from '../elements/email/email';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { CheckDescribedByTag } from '../utils/aria-describedByTest';

const emailWrongFormatMsg = 'Invalid email format';
const emailEmptyFieldMsg = 'email cannot be empty';
const emailTestId = 'email-input';
const emailName = 'email';
const emailLabel = 'Email address';
const emailHint = 'This explains how to complete the email address field';
const customErrorEmptyValue = 'please provide an email address';
const customErrorInvalidValue = 'this is not a valid email address';

const basicProps = {
	hint: emailHint,
	label: emailLabel,
	name: emailName,
	testId: emailTestId,
};

const handleSubmit = jest.fn();

describe('Email input', () => {
	test('is accessible', async () => {
		const { container } = formSetup({
			render: <FFInputEmail {...basicProps} />,
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('values get captured correctly', async () => {
		const { getByText, getByTestId } = formSetup({
			render: <FFInputEmail {...basicProps} />,
			onSubmit: handleSubmit,
		});

		userEvent.type(getByTestId(emailTestId), 'david.alekna@tpr.gov.uk');
		getByText('Submit').click();

		expect(getByTestId(emailTestId)).toHaveValue('david.alekna@tpr.gov.uk');
	});

	test('should not accept invalid email address', async () => {
		const { getByText, getByTestId, form } = formSetup({
			render: <FFInputEmail {...basicProps} />,
			onSubmit: handleSubmit,
		});

		userEvent.type(getByTestId(emailTestId), 'this is not an email address');
		getByText('Submit').click();

		expect(getByText(emailWrongFormatMsg)).toBeInTheDocument();
		expect(form.getState().valid).toBeFalsy();
	});

	test('accepts valid email', async () => {
		const { getByText, getByTestId, form } = formSetup({
			render: <FFInputEmail {...basicProps} />,
			onSubmit: handleSubmit,
		});

		userEvent.type(getByTestId(emailTestId), 'david.alekna@tpr.gov.uk');
		getByText('Submit').click();

		expect(form.getState().valid).toBeTruthy();
	});

	test('renders readonly', () => {
		const { queryByTestId } = formSetup({
			render: <FFInputEmail {...basicProps} readOnly={true} />,
		});

		const label = queryByTestId(emailTestId);
		expect(label).toHaveAttribute('readonly');
	});

	test('has correct describedby tag when an error is shown', () => {
		const { getByText, getByTestId } = formSetup({
			render: <FFInputEmail {...basicProps} required={true} />,
			onSubmit: handleSubmit,
		});

		const emailTest = getByTestId(emailTestId);
		CheckDescribedByTag(getByText, emailTest, emailEmptyFieldMsg, emailHint);
	});

	describe('custom error messages for Email input', () => {
		test('displaying custom Empty Value error message', () => {
			const { getByText, form } = formSetup({
				render: (
					<FFInputEmail
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

		test('displaying custom Invalid format error message', () => {
			const { getByText, getByTestId, form } = formSetup({
				render: (
					<FFInputEmail
						{...basicProps}
						required={true}
						errorEmptyValue={customErrorEmptyValue}
						errorInvalidValue={customErrorInvalidValue}
					/>
				),
				onSubmit: handleSubmit,
			});

			userEvent.type(getByTestId(emailTestId), 'david.alekna');
			getByText('Submit').click();

			expect(getByText(customErrorInvalidValue)).toBeInTheDocument();
			expect(form.getState().valid).toBeFalsy();
		});
	});
});
