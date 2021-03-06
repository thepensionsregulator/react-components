import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFSelect } from '../elements/select/select';
import { axe } from 'jest-axe';

describe('Select input', () => {
	test('is accessible', async () => {
		const testId = 'select-input';
		const items = [
			{ label: 'apple', value: 'apple' },
			{ label: 'pear', value: 'pear' },
			{ label: 'orange', value: 'orange' },
			{ label: 'grape', value: 'grape' },
			{ label: 'banana', value: 'banana' },
		];
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
		const testId = 'select-input';
		const items = [
			{ label: 'apple', value: 'apple' },
			{ label: 'pear', value: 'pear' },
			{ label: 'orange', value: 'orange' },
			{ label: 'grape', value: 'grape' },
			{ label: 'banana', value: 'banana' },
		];

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

	test('renders readonly', () => {
		const testId = 'select-input';
		const items = [
			{ label: 'apple', value: 'apple' },
			{ label: 'pear', value: 'pear' },
			{ label: 'orange', value: 'orange' },
			{ label: 'grape', value: 'grape' },
			{ label: 'banana', value: 'banana' },
		];

		const { queryByTestId } = formSetup({
			render: (
				<FFSelect
					label="Select your favourite fruit"
					testId={testId}
					name="fruits"
					error="required"
					required={true}
					options={items}
					readOnly={true}
				/>
			),
		});

		const label = queryByTestId(testId);
		expect(label).toHaveAttribute('readonly');
	});
});
