import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFSelect } from '../elements/select/select';
import { axe } from 'jest-axe';
import { FieldProps } from '../renderFields';

const testId = 'select-input';

const items = [
	{ label: 'apple', value: 'apple' },
	{ label: 'pear', value: 'pear' },
	{ label: 'orange', value: 'orange' },
	{ label: 'grape', value: 'grape' },
	{ label: 'banana', value: 'banana' },
];

const basicProps: FieldProps = {
	hint: 'This explains how to complete the select field',
	label: 'Select your favourite fruit',
	name: 'fruits',
	testId: testId,
	options: items,
};

describe('Select input', () => {
	describe('rendering', () => {
		test('renders correctly', () => {
			const { queryByTestId } = formSetup({
				render: <FFSelect {...basicProps} />,
			});

			const label = queryByTestId(testId);
			expect(label).toBeDefined();
			expect(label).not.toHaveAttribute('required');
			expect(label).not.toHaveAttribute('readonly');
		});
		test('renders required', () => {
			const { queryByTestId } = formSetup({
				render: <FFSelect {...basicProps} required={true} />,
			});

			const label = queryByTestId(testId);
			expect(label).toHaveAttribute('required');
		});
		test('renders readonly', () => {
			const { queryByTestId } = formSetup({
				render: <FFSelect {...basicProps} readOnly={true} />,
			});

			const label = queryByTestId(testId);
			expect(label).toHaveAttribute('readonly');
		});
	});

	test('is accessible', async () => {
		const { container } = formSetup({
			render: (
				<FFSelect
					label="Select your favourite fruit"
					testId={testId}
					name="fruits"
					error="required"
					required={true}
					options={items}
				/>
			),
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('on button click opens the dropdown', () => {
		const { queryByTestId, getByText } = formSetup({
			render: (
				<FFSelect
					label="Select your favourite fruit"
					testId={testId}
					name="fruits"
					error="required"
					required={true}
					options={items}
				/>
			),
		});

		// todo: check that it's not open before the click

		queryByTestId('select-input-button').click();
		items.map((item) => {
			expect(getByText(item.label)).toBeDefined();
		});
	});
});
