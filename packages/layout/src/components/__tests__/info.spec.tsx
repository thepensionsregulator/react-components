import React from 'react';
import { render } from '@testing-library/react';
import { Info } from '../info/info';
import { axe } from 'jest-axe';

describe('Info', () => {
	test('is accessible', async () => {
		const { container } = render(
			<Info importantMessage="Important Information" title="Title">
				<p>Here is some information</p>
			</Info>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('important message renders correctly', () => {
		const { getByText } = render(
			<Info importantMessage="Important Information" title="Title">
				<p>Here is some information</p>
			</Info>,
		);

		const wrapper = getByText('Important Information');
		const title = getByText('Title');
		expect(wrapper).toHaveClass('importantMessage');
		expect(title.tagName).toEqual('H2');
		expect(getByText('Here is some information')).toBeInTheDocument();
	});
});
