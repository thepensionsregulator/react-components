import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFCheckbox } from '../elements/checkbox/checkbox';
import { renderFields } from '../renderFields';
import { fireEvent, getByTestId } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('Checkbox input', () => {
	test('is accessible', async () => {
		const handleSubmit = jest.fn();
		const { container } = formSetup({
			render: renderFields([
				{ label: 'Click me 1', name: 'checkbox-1', type: 'checkbox' },
				{ label: 'Click me 2', name: 'checkbox-2', type: 'checkbox' },
				{ label: 'Click me 3', name: 'checkbox-3', type: 'checkbox' },
				{ label: 'Click me 4', name: 'checkbox-4', type: 'checkbox' },
			]),
			onSubmit: handleSubmit,
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

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

	test('renders required attribute', () => {
		const { getByLabelText } = formSetup({
			render: (
				<FFCheckbox
					required
					label="Click me"
					name="important-checkbox"
					testId="checkbox"
				/>
			),
		});
		const required = getByLabelText(/Click me/);
		expect(required).toHaveAttribute('required');
	});

	test('does not render required attribute when optional', () => {
		const { getByLabelText } = formSetup({
			render: (
				<FFCheckbox
					label="Click me"
					name="important-checkbox"
					testId="checkbox"
				/>
			),
		});
		const optional = getByLabelText(/Click me/);
		expect(optional).not.toHaveAttribute('required');
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
			`"<g fill=\\"#f5f5f5\\" stroke=\\"#585858\\" stroke-width=\\"1\\"><rect width=\\"40\\" height=\\"40\\" stroke=\\"none\\"></rect><rect x=\\"0.5\\" y=\\"0.5\\" width=\\"39\\" height=\\"39\\" fill=\\"none\\"></rect></g>"`,
		);
		getByLabelText(/Click me/).click();
		const iconChecked = container.querySelector('svg');
		expect(iconChecked.innerHTML).toMatchInlineSnapshot(
			`"<g transform=\\"translate(2 2)\\" fill=\\"#f5f5f5\\" stroke=\\"#585858\\" stroke-width=\\"4\\"><rect width=\\"40\\" height=\\"40\\" stroke=\\"none\\" fill=\\"none\\"></rect><rect x=\\"0.1\\" y=\\"0.1\\" width=\\"36\\" height=\\"36\\" fill=\\"none\\"></rect></g><g transform=\\"translate(11 10)\\"><path d=\\"M3.648-.443l8.18,5.1L23.423-13.085\\" transform=\\"translate(-3.648 13.085)\\" fill=\\"none\\" stroke=\\"#006ebc\\" stroke-width=\\"5\\"></path></g>"`,
		);
	});

	test('callback function', () => {
		const updateSpanContent = (value: boolean) => {
			getByTestId(container, 'my-span').innerText = value.toString();
		};
		const { getByLabelText, container } = formSetup({
			render: (
				<>
					<FFCheckbox
						required
						label="My checkbox"
						name="my-checkbox"
						callback={(value) => updateSpanContent(value)}
					/>
					<span data-testid="my-span"></span>
				</>
			),
		});

		getByLabelText('My checkbox').click();
		expect(getByTestId(container, 'my-span').innerText).toBe('true');
	});

	test('has correct describedby tag', () => {
		const hint = 'This explains how to complete the field';
		const labelText = 'My checkbox';
		const id = 'test-checkbox';
		const { getByLabelText } = formSetup({
			render: (
				<FFCheckbox
					id={id}
					required
					label={labelText}
					hint={hint}
					name="my-checkbox"
				/>
			),
		});
		const checkbox = getByLabelText(labelText);
		expect(checkbox).not.toBeNull();
		expect(checkbox).toHaveAttribute('aria-describedby', `${id}-hint`);
	});

	test('has correct label reference', () => {
		const hint = 'This explains how to complete the field';
		const labelText = 'My checkbox';
		const id = 'test-checkbox';
		const { container } = formSetup({
			render: (
				<FFCheckbox
					id={id}
					required
					label={labelText}
					hint={hint}
					name="my-checkbox"
				/>
			),
		});
		const label = container.querySelector(`[id=${id}-label]`);
		expect(label).not.toBeNull();
		expect(label).toHaveAttribute('for', id);
	});
});
