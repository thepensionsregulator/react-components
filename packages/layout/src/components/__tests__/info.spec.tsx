import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Info } from '../info/info';

describe('Footer', () => {
	test('Important renders correctly', () => {
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
