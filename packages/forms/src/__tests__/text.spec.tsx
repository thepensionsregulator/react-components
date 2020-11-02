import React from 'react';
import { fireEvent } from '@testing-library/react';
import { formSetup } from '../__mocks__/setup';
import { FFInputText } from '../elements/text/text';
import { validate, renderFields } from '../index';
import { FieldProps } from '../renderFields';
import { axe } from 'jest-axe';

describe('Text input', () => {
	test('is accessible', async () => {
		const { container } = formSetup({
			render: (
				<FFInputText label="Name" testId="text-input" name="name" type="text" />
			),
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('renders label', () => {
		const { queryByTestId } = formSetup({
			render: (
				<FFInputText label="Name" testId="text-input" name="name" type="text" />
			),
		});

		const label = queryByTestId('text-input');
		expect(label).toBeInTheDocument();
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
			render: (
				<FFInputText
					ariaLabel="Name"
					testId="text-input"
					name="name"
					type="text"
				/>
			),
		});

		const label = queryByTestId('text-input');
		expect(label).toHaveAttribute('aria-label', 'Name');
	});

	test('renders hint correctly', () => {
		const { queryByText } = formSetup({
			render: (
				<FFInputText
					label="Name"
					hint="enter your name here"
					name="name"
					type="text"
				/>
			),
		});
		const hint = queryByText(/enter your name here/);
		expect(hint).toBeInTheDocument();
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
});
