import React from 'react';
import { render } from '@testing-library/react';
import { Header } from '../header/header';
import { axe } from 'jest-axe';

describe('Header', () => {
	test('is accessible', async () => {
		const { container } = render(
			<Header
				logoSrc="https://www.thepensionsregulator.gov.uk/logo.png"
				logoHref="https://www.thepensionsregulator.gov.uk"
				title="Exchange - Scheme return"
				schemeOptionsHref="https://www.thepensionsregulator.gov.uk/scheme-options"
				onClickLogout={jest.fn()}
			/>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('it renders correctly', () => {
		const schemeOptionsHref =
			'https://www.thepensionsregulator.gov.uk/scheme-options';
		const onClickLogout = jest.fn();
		const { getByTestId, getByText, getByAltText } = render(
			<Header
				logoSrc="https://www.thepensionsregulator.gov.uk/logo.png"
				logoHref="https://www.thepensionsregulator.gov.uk"
				title="Exchange - Scheme return"
				schemeOptionsHref={schemeOptionsHref}
				onClickLogout={onClickLogout}
			/>,
		);

		const image = getByAltText('Go to The Pensions Regulator website');
		const schemeOptionsLink = getByTestId('onClickSchemeOptions');
		getByTestId('onClickLogout').click();

		expect(image).toHaveAttribute(
			'src',
			'https://www.thepensionsregulator.gov.uk/logo.png',
		);

		const anchor = image.parentElement;
		expect(anchor).toHaveAttribute(
			'href',
			'https://www.thepensionsregulator.gov.uk',
		);
		expect(schemeOptionsLink).toBeInTheDocument();
		expect(schemeOptionsLink).toHaveAttribute('href', schemeOptionsHref);
		expect(onClickLogout).toHaveBeenCalledTimes(1);
		expect(getByText('Exchange - Scheme return')).toBeInTheDocument();
	});
});
