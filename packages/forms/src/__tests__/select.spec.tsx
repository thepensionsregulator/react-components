import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFSelect } from '../elements/select/select';

describe('Select', () => {
	test('on button click opens the dropdown', () => {
		const testId = 'select-input';
		const items = [
			{ label: 'apple', value: 'apple' },
			{ label: 'pear', value: 'pear' },
			{ label: 'orange', value: 'orange' },
			{ label: 'grape', value: 'grape' },
			{ label: 'banana', value: 'banana' },
		];

		const { queryByTestId, getByText, debug } = formSetup({
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
