import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFRadioButton } from '../components/radio';
import '@testing-library/jest-dom/extend-expect';
import { renderFields } from '../utils/forms';
import { fireEvent } from '@testing-library/react';

describe('RadioButton', () => {
	test('checked value being captured in state', () => {
		const handleSubmit = jest.fn();
		const { container, getByLabelText, form } = formSetup({
			render: renderFields([
				{
					name: 'radio_button',
					label: 'Click me 1',
					type: 'radio',
					value: 'radio_1',
				},
				{
					name: 'radio_button',
					label: 'Click me 2',
					type: 'radio',
					value: 'radio_2',
				},
				{
					name: 'radio_button',
					label: 'Click me 3',
					type: 'radio',
					value: 'radio_3',
				},
			]),
			onSubmit: handleSubmit,
		});

		getByLabelText('Click me 1').click();
		getByLabelText('Click me 2').click();
		getByLabelText('Click me 3').click();

		const submit = container.querySelector('button[type="submit"]');
		fireEvent.click(submit);

		expect(handleSubmit).toBeCalledTimes(1);
		expect(form.getState().values).toMatchInlineSnapshot(`
		Object {
		  "radio_button": "radio_3",
		}
	`);
	});

	test('checking and unchecking the radio button', () => {
		const { getByLabelText, getByTestId } = formSetup({
			render: (
				<FFRadioButton
					name="radio_button"
					label="Click me"
					type="radio"
					value="radio_3"
					testId="radio"
				/>
			),
		});

		expect(getByTestId(/radio-unchecked/)).toBeInTheDocument();
		getByLabelText(/Click me/).click();
		expect(getByTestId(/radio-checked/)).toBeInTheDocument();
	});

	test('radio button icon is being toggled', () => {
		const { getByLabelText, container } = formSetup({
			render: (
				<FFRadioButton
					name="radio_button"
					label="Click me"
					type="radio"
					value="radio_3"
					testId="radio"
				/>
			),
		});

		const radioUncheked = container.querySelector('svg');
		expect(radioUncheked.innerHTML).toMatchInlineSnapshot(
			`"<path d=\\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\\"></path><path d=\\"M0 0h24v24H0z\\" fill=\\"none\\"></path>"`,
		);
		getByLabelText(/Click me/).click();
		const radioChecked = container.querySelector('svg');
		expect(radioChecked.innerHTML).toMatchInlineSnapshot(
			`"<path d=\\"M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\\"></path><path d=\\"M0 0h24v24H0z\\" fill=\\"none\\"></path>"`,
		);
	});
});
