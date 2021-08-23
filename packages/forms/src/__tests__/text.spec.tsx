import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { formSetup } from '../__mocks__/setup';
import { FFInputText } from '../elements/text/text';
import { validate, renderFields } from '../index';
import { FieldProps } from '../renderFields';
import { axe } from 'jest-axe';
import { CheckDescribedByTag } from '../utils/aria-describedByTest';
import AccessibilityHelper from '../elements/accessibilityHelper';

const testId = 'text-input';

const basicProps: FieldProps = {
	hint: 'enter your name here',
	label: 'Name',
	name: 'name',
	testId: testId,
	type: 'text',
};

describe('Text input', () => {
	describe('rendering', () => {
		test('renders correctly', () => {
			const { queryByTestId } = formSetup({
				render: <FFInputText {...basicProps} />,
			});

			const label = queryByTestId(testId);
			expect(label).toBeDefined();
			expect(label).not.toHaveAttribute('required');
		});

		test('renders required', () => {
			const { queryByTestId } = formSetup({
				render: <FFInputText {...basicProps} required={true} />,
			});

			const label = queryByTestId(testId);
			expect(label).toHaveAttribute('required');
		});

		test('renders label', () => {
			const { getByText } = formSetup({
				render: <FFInputText {...basicProps} />,
			});

			const label = getByText(/Name/);
			expect(label).toBeInTheDocument();
			expect(label.tagName).toBe('DIV');
			expect(label).toHaveAttribute('id', 'name-label');
		});

		test('renders wrapper with custom tagName', () => {
			const { container } = formSetup({
				render: <FFInputText {...basicProps} wrapperElement="div" />,
			});

			expect(container.tagName).toBe('DIV');
		});

		test('renders label with custom tagName', () => {
			const { getByText } = formSetup({
				render: <FFInputText {...basicProps} labelElement="label" />,
			});

			const label = getByText(/Name/);
			expect(label).toBeInTheDocument();
			expect(label.tagName).toBe('LABEL');
		});

		test('renders heading around label', () => {
			const { getByText } = formSetup({
				render: <FFInputText {...basicProps} headingElement="h3" />,
			});

			const label = getByText(/Name/);
			expect(label).toBeInTheDocument();
			expect(label.parentElement.tagName).toBe('H3');
		});

		test('renders readonly', () => {
			const { queryByTestId } = formSetup({
				render: <FFInputText {...basicProps} readOnly={true} />,
			});

			const label = queryByTestId(testId);
			expect(label).toHaveAttribute('readonly');
		});

		test('renders maxLength', () => {
			const { queryByTestId } = formSetup({
				render: <FFInputText testId="text-input" name="name" maxLength={3} />,
			});

			var textInput = queryByTestId(testId);
			userEvent.type(textInput, 'ABCDEF');
			fireEvent.blur(textInput);

			expect(textInput).toHaveAttribute('maxlength');
			expect(textInput).toHaveValue('ABC');
		});
		test('renders label with title optional', () => {
			const { queryByText } = formSetup({
				render: (
					<FFInputText label="Name" required={false} name="name" type="text" />
				),
			});
			const label = queryByText(/optional/g);
			expect(label).toBeInTheDocument();
		});

		test('renders aria-label', () => {
			const { queryByTestId } = formSetup({
				render: <FFInputText {...basicProps} />,
			});

			const label = queryByTestId(testId);
			expect(label).toHaveAttribute('aria-label', 'Name');
		});

		test('renders hint correctly', () => {
			const { queryByText } = formSetup({
				render: <FFInputText {...basicProps} />,
			});
			const hint = queryByText(/enter your name here/);
			expect(hint).toBeInTheDocument();
		});
	});

	test('is accessible', async () => {
		const { container } = formSetup({
			render: (
				<FFInputText label="Name" testId={testId} name="name" type="text" />
			),
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('shows error message on required field when left empty', () => {
		const fields: FieldProps[] = [
			{
				name: 'line_1',
				label: 'Address line 1',
				type: 'text',
				error: 'This is a required field',
				required: true,
			},
		];

		const { form, queryByText, getByLabelText } = formSetup({
			render: renderFields(fields),
			validate: validate(fields),
		});

		getByLabelText(/Address line 1/).focus();
		getByLabelText(/Address line 1/).blur();

		const errorMessage = queryByText(/This is a required field/);
		expect(errorMessage).toBeInTheDocument();
		expect(form.getState().invalid).toBeTruthy();
	});

	test('handles input', async () => {
		const handleSubmit = jest.fn();
		const { container, form } = formSetup({
			render: <FFInputText label="Input Text" name="name" type="text" />,
			onSubmit: handleSubmit,
		});
		const name = container.querySelector('input[name="name"]');
		const submit = container.querySelector('button[type="submit"]');

		fireEvent.change(name, {
			target: {
				value: 'Vladimir',
			},
		});

		fireEvent.click(submit);

		expect(handleSubmit).toBeCalledTimes(1);
		expect(form.getState().invalid).toBeFalsy();
		expect(form.getState().values).toMatchInlineSnapshot(`
		Object {
		  "name": "Vladimir",
		}
	`);
	});

	test('has correct describedby tag when an error is shown', () => {
		const name = 'textInput';
		const label = 'Text Line 1';
		const error = 'This is a required field';
		const hint = 'This explains how to complete the field';
		const handleSubmit = jest.fn();

		const fields: FieldProps[] = [
			{
				name: name,
				testId: testId,
				label: label,
				type: 'text',
				hint: hint,
				error: error,
				required: true,
				accessibilityHelper: new AccessibilityHelper(name, !!label, !!hint),
			},
		];

		const { getByTestId, getByText } = formSetup({
			render: renderFields(fields),
			validate: validate(fields),
			onSubmit: handleSubmit,
		});

		const textTest = getByTestId(testId);
		CheckDescribedByTag(getByText, textTest, error, hint);
	});
});
