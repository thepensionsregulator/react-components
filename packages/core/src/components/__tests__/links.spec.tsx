import React from 'react';
import { Link } from '../links/links';
import { render } from '@testing-library/react';

describe('Links', () => {
	test('Link with default appearance', () => {
		const { getByTestId } = render(
			<Link testId="link-anchor" href="http://www.google.com" target="_blank">
				Home
			</Link>,
		);
		expect(getByTestId('link-anchor')).toBeDefined();
		expect(getByTestId('link-anchor')).toHaveAttribute(
			'data-testid',
			'link-anchor',
		);
		expect(getByTestId('link-anchor')).toHaveAttribute(
			'href',
			'http://www.google.com',
		);
		expect(getByTestId('link-anchor')).toHaveAttribute('target', '_blank');
	});
});
