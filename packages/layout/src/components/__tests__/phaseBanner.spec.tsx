import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { PhaseBanner } from '../phaseBanner/phaseBanner';
import { Link } from '@tpr/core';
import { axe } from 'jest-axe';

const betaIconTestId = 'beta-icon';
const childrenTestId = 'children';
const linkText = 'feedback';
const childrenTextContent = `This is a new service — your ${linkText} will help us improve it.`;

describe('PhaseBanner component', () => {
	afterEach(() => {
		cleanup();
	});

	test('is accessible', async () => {
		const { container } = render(<PhaseBanner />);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('default component renders correctly', () => {
		const { getByTestId } = render(<PhaseBanner />);

		expect(getByTestId(betaIconTestId)).toBeDefined();
	});

	test('with children', () => {
		const TextContent = () => (
			<p data-testid={childrenTestId}>
				{`This is a new service — your `}
				<Link href="mailto:user@domain.com">feedback</Link>
				{` will help us improve it.`}
			</p>
		);

		const { getByTestId } = render(
			<PhaseBanner>
				<TextContent />
			</PhaseBanner>,
		);

		expect(getByTestId(betaIconTestId)).toBeDefined();
		expect(getByTestId(childrenTestId)).toBeDefined();

		const innerText = getByTestId(childrenTestId).textContent;
		expect(innerText).toBe(childrenTextContent);
	});
});
