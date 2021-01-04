import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from '../footer/footer';
import { axe } from 'jest-axe';

describe('Footer', () => {
	test('is accessible', async () => {
		const links = [
			{ title: 'b-link number 1', url: '#' },
			{ title: 'b-link number 2', url: '#' },
			{ title: 'b-link number 3', url: '#' },
		];
		const { container } = render(
			<Footer links={links} onLinkClickHandler={() => {}} />,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('it renders with links', () => {
		const links = [
			{ title: 'b-link number 1', url: '#' },
			{ title: 'b-link number 2', url: '#' },
			{ title: 'b-link number 3', url: '#' },
		];

		const { getAllByText } = render(
			<Footer links={links} onLinkClickHandler={() => {}} />,
		);

		const bottomLinks = getAllByText(/b-link number/i);

		expect(bottomLinks).toBeDefined();
		expect(bottomLinks).toHaveLength(links.length);
	});
	test('it renders correctly', () => {
		const { getByText, getByAltText } = render(
			<Footer
				logoUrl="https://www.thepensionsregulator.gov.uk"
				copyright="Copyright TPR"
				onLinkClickHandler={() => {}}
				links={[]}
			/>,
		);

		const image = getByAltText('The Pensions Regulator logo');
		expect(image).toHaveAttribute(
			'src',
			'https://www.thepensionsregulator.gov.uk',
		);

		expect(getByText('Copyright TPR')).toBeInTheDocument();
	});
});
