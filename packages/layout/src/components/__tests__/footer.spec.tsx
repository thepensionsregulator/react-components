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
		const { container } = render(<Footer links={links} />);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('it renders with links', () => {
		const links = [
			{ title: 'b-link number 1', url: 'url1' },
			{ title: 'b-link number 2', url: 'url2' },
			{ title: 'b-link number 3', url: 'url3' },
		];

		const { getAllByText } = render(<Footer links={links} />);

		const bottomLinks = getAllByText(/b-link number/i);

		expect(bottomLinks).toBeDefined();
		expect(bottomLinks).toHaveLength(links.length);
		assertThatLinkIsRenderedCorrectly(
			bottomLinks[0],
			links[0].title,
			links[0].url,
		);
		assertThatLinkIsRenderedCorrectly(
			bottomLinks[1],
			links[1].title,
			links[1].url,
		);
		assertThatLinkIsRenderedCorrectly(
			bottomLinks[2],
			links[2].title,
			links[2].url,
		);
	});

	test('it renders correctly', () => {
		const { getByText, getByAltText } = render(
			<Footer
				logoUrl="https://www.thepensionsregulator.gov.uk"
				copyright="Copyright TPR"
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

	function assertThatLinkIsRenderedCorrectly(
		link: HTMLElement,
		expectedTitle: string,
		expectedUrl: string,
	): void {
		expect(link.innerHTML).toEqual(expectedTitle);
		expect(link).toHaveAttribute('href', expectedUrl);
	}
});
