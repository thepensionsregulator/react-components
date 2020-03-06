import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFCheckbox } from '../components/checkbox';
import { renderFields } from '../utils/forms';
import { fireEvent } from '@testing-library/react';

describe('Checkbox', () => {
	test('checked values being captured in state', () => {
		const handleSubmit = jest.fn();
		const { container, getByLabelText, form } = formSetup({
			render: renderFields([
				{ label: 'Click me 1', name: 'checkbox-1', type: 'checkbox' },
				{ label: 'Click me 2', name: 'checkbox-2', type: 'checkbox' },
				{ label: 'Click me 3', name: 'checkbox-3', type: 'checkbox' },
				{ label: 'Click me 4', name: 'checkbox-4', type: 'checkbox' },
			]),
			onSubmit: handleSubmit,
		});

		getByLabelText('Click me 1').click();
		getByLabelText('Click me 3').click();
		getByLabelText('Click me 4').click();

		const submit = container.querySelector('button[type="submit"]');
		fireEvent.click(submit);

		expect(handleSubmit).toBeCalledTimes(1);
		expect(form.getState().values).toMatchInlineSnapshot(`
		Object {
		  "checkbox-1": true,
		  "checkbox-3": true,
		  "checkbox-4": true,
		}
	`);
	});

	test('checking and unchecking the checkbox', () => {
		const { getByLabelText, getByTestId } = formSetup({
			render: (
				<FFCheckbox
					required
					label="Click me"
					name="important-checkbox"
					testId="checkbox"
				/>
			),
		});
		expect(getByTestId(/checkbox-unchecked/)).toBeInTheDocument();
		getByLabelText(/Click me/).click();
		expect(getByTestId(/checkbox-checked/)).toBeInTheDocument();
	});

	test('checkbox icon is being toggled', () => {
		const { getByLabelText, container } = formSetup({
			render: (
				<FFCheckbox required label="Click me" name="important-checkbox" />
			),
		});

		const iconUncheked = container.querySelector('svg');
		expect(iconUncheked.innerHTML).toMatchInlineSnapshot(
			`"<path d=\\"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z\\"></path><path d=\\"M0 0h24v24H0z\\" fill=\\"none\\"></path>"`,
		);
		getByLabelText(/Click me/).click();
		const iconChecked = container.querySelector('svg');
		expect(iconChecked.innerHTML).toMatchInlineSnapshot(
			`"<path d=\\"M0 0h24v24H0z\\" fill=\\"none\\"></path><path d=\\"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\\"></path>"`,
		);
	});
});
