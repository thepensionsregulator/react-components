import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFRadioButton } from '../elements/radio/radio';
import { FFInputText, renderFields } from '../index';
import { fireEvent, getByTestId } from '@testing-library/react';
import { axe } from 'jest-axe';
import { FieldProps } from '../../lib/renderFields';

const testId = 'radio-button';

const basicProps: FieldProps = {
	hint: 'This explains how to complete the currency field',
	label: 'Click Me',
	name: 'radio_button',
	value: 'radio_1',
	testId: testId,
};

describe('Radio input', () => {
	test('renders correctly', () => {
		const { queryByTestId } = formSetup({
			render: <FFRadioButton {...basicProps} />,
		});

		const button = queryByTestId(testId);
		expect(button).toBeDefined();
		expect(button).toHaveAttribute('value', basicProps.value);
		expect(button).not.toHaveAttribute('required');
	});

	test('can render with required attribute', () => {
		const { queryByTestId } = formSetup({
			render: <FFRadioButton {...basicProps} required={true} />,
		});

		const button = queryByTestId(testId);
		expect(button).toHaveAttribute('required');
	});

	test('is accessible', async () => {
		const handleSubmit = jest.fn();
		const { container } = formSetup({
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
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

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
			`"<g fill=\\"#f5f5f5\\" stroke=\\"#585858\\" stroke-width=\\"1\\"><circle cx=\\"20\\" cy=\\"20\\" r=\\"20\\" stroke=\\"none\\"></circle><circle cx=\\"20\\" cy=\\"20\\" r=\\"19.5\\" fill=\\"none\\"></circle></g>"`,
		);
		getByLabelText(/Click me/).click();
		const radioChecked = container.querySelector('svg');
		expect(radioChecked.innerHTML).toMatchInlineSnapshot(
			`"<g transform=\\"translate(0.5 0.5)\\" fill=\\"#f5f5f5\\" stroke=\\"#585858\\" stroke-width=\\"4\\"><circle cx=\\"19.6\\" cy=\\"19.6\\" r=\\"20\\" stroke=\\"none\\"></circle><circle cx=\\"19.6\\" cy=\\"19.6\\" r=\\"18\\" fill=\\"none\\"></circle></g><circle cx=\\"10\\" cy=\\"10\\" r=\\"10\\" transform=\\"translate(10.3 10.3)\\" fill=\\"#006ebc\\"></circle>"`,
		);
	});

	test('callback function', () => {
		const updateSpanContent = (value: boolean) => {
			getByTestId(container, 'my-span').innerText = value.toString();
		};
		const { getByLabelText, container } = formSetup({
			render: (
				<>
					<FFRadioButton
						required
						label="My radiobutton"
						name="my-radiobutton"
						value="my checkbox value"
						callback={(value) => updateSpanContent(value)}
					/>
					<span data-testid="my-span"></span>
				</>
			),
		});

		getByLabelText('My radiobutton').click();
		expect(getByTestId(container, 'my-span').innerText).toBe(
			'my checkbox value',
		);
	});

	test('renders hint within the label', () => {
		const hint = 'This explains how to complete the field';
		const labelText = 'My radiobutton';
		const id = 'test-radiobutton';
		const { getByText } = formSetup({
			render: (
				<FFRadioButton
					id={id}
					required
					label={labelText}
					hint={hint}
					name="my-radiobutton"
				/>
			),
		});
		const hintElement = getByText(hint);
		expect(hintElement).not.toBeNull();

		const label = hintElement.closest('label');
		expect(label).toBeDefined();
	});

	test('has correct label reference', () => {
		const hint = 'This explains how to complete the field';
		const labelText = 'My radiobutton';
		const id = 'test-radiobutton';
		const { container } = formSetup({
			render: (
				<FFRadioButton
					id={id}
					required
					label={labelText}
					hint={hint}
					name="my-radiobutton"
				/>
			),
		});
		const label = container.querySelector(`[id=${id}-label]`);
		expect(label).not.toBeNull();
		expect(label).toHaveAttribute('for', id);
	});
	test('renders child components', () => {
		// Arrange
		const childId = 'childId';
		// Act
		const { getByTestId } = formSetup({
			render: (
				<FFRadioButton value="a" label="a" name="a" id="radio_a">
					<FFInputText id={childId} name="phoneNumber" testId={childId} />
				</FFRadioButton>
			),
		});
		// Assert
		expect(getByTestId(childId)).toBeInTheDocument();
	});
});
