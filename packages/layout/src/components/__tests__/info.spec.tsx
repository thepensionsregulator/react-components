import React from 'react';
import { render } from '@testing-library/react';
import { Info } from '../info/info';
import { axe } from 'jest-axe';

describe('Info', () => {
	test('is accessible', async () => {
		const { container } = render(
			<Info importantMessage="Important Information" title="Title" id="example">
				<p>Here is some information</p>
			</Info>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('uses section element', () => {
		const { getByTestId } = render(
			<Info importantMessage="Important Information" title="Title" id="example">
				<p>Here is some information</p>
			</Info>,
		);
		const container = getByTestId('example');
		expect(container.tagName).toEqual('SECTION');
	});

	test('important message renders correctly', () => {
		const { getByText, getByTestId } = render(
			<Info importantMessage="Important Information" title="Title" id="example">
				<p>Here is some information</p>
			</Info>,
		);

		const container = getByTestId('example');
		const wrapper = getByText('Important Information');
		const title = getByText('Title');
		expect(container).toHaveAttribute('aria-labelledby', 'example-important');
		expect(wrapper).toHaveClass('importantMessage');
		expect(wrapper).toHaveAttribute('id', 'example-important');
		expect(title.tagName).toEqual('H2');
		expect(getByText('Here is some information')).toBeInTheDocument();
	});
});
