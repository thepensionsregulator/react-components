import React from 'react';
import { fireEvent } from '@testing-library/react';
import { formSetup } from '../__mocks__/setup';
import { FFInputText } from '../components/text';
import { validate } from '../utils/validation';
import { renderFields } from '../utils/forms';

describe('Text', () => {
	test('renders label', () => {
		const { queryByText } = formSetup({
			render: <FFInputText label="Name" required name="name" type="text" />,
		});

		const label = queryByText('Name');
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
		const fields = [
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
			render: <FFInputText name="name" type="text" />,
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
