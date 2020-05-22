import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Footer } from '../footer';

describe('Footer', () => {
	test('it renders with links', () => {
		const links = [
			{ title: 'b-link number 1', url: '#' },
			{ title: 'b-link number 2', url: '#' },
			{ title: 'b-link number 3', url: '#' },
		];

		const { getAllByText } = render(<Footer links={links} />);

		const bottomLinks = getAllByText(/b-link number/i);

		expect(bottomLinks).toBeDefined();
		expect(bottomLinks).toHaveLength(links.length);
	});
	test('it renders correctly', () => {
		const { getByText, getByAltText, getAllByRole } = render(
			<Footer
				logoUrl="https://www.thepensionsregulator.gov.uk"
				copyright="Copyright TPR"
				links={[]}
			/>,
		);

		const image = getByAltText('TPR Logo');
		expect(image).toHaveAttribute(
			'src',
			'https://www.thepensionsregulator.gov.uk',
		);

		expect(getByText('Copyright TPR')).toBeInTheDocument();
	});
});
