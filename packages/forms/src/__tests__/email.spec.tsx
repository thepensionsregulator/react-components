import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFInputEmail } from '../elements/email/email';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { CheckDescribedByTag } from '../utils/aria-describedByTest';

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

	test('should not accept invalid email addresses', async () => {
		const testId = 'email-input';
		const handleSubmit = jest.fn();
		const { getByText, getByTestId, form } = formSetup({
			render: <FFInputEmail label="Email" testId={testId} name="email" />,
			onSubmit: handleSubmit,
		});

		userEvent.type(getByTestId(testId), 'this is not an email address');
		getByText('Submit').click();

		expect(form.getState().valid).toBeFalsy();
	});

	test('accepts only valid emails', async () => {
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

	test('composes custom validation function', async () => {
		const testId = 'email-input';
		const errorMessage = 'Must be a TPR email';
		const handleSubmit = jest.fn();
		const { getByText, getByTestId, queryByText, form } = formSetup({
			render: (
				<FFInputEmail
					label="Email"
					testId={testId}
					name="email"
					validate={(email) =>
						email && email.includes('tpr.gov.uk') ? undefined : errorMessage
					}
				/>
			),
			onSubmit: handleSubmit,
		});

		userEvent.type(getByTestId(testId), 'david.alekna@gmail.com');
		getByText('Submit').click();

		expect(queryByText(errorMessage)).toBeInTheDocument();
		expect(form.getState().valid).toBeFalsy();
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

		const handleSubmit = jest.fn();

		const { getByText, getByTestId } = formSetup({
			render: <FFInputEmail label="Email" testId={testId} name={name} />,
			onSubmit: handleSubmit,
		});

		const emailTest = getByTestId(testId);

		CheckDescribedByTag(getByText, emailTest, 'Invalid email address');
	});
});
