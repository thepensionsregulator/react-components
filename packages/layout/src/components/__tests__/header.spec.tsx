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
				onClickSchemeOptions={jest.fn()}
				onClickLogout={jest.fn()}
			/>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('it renders correctly', () => {
		const onClickSchemeOptions = jest.fn();
		const onClickLogout = jest.fn();
		const { getByTestId, getByText, getByAltText } = render(
			<Header
				logoSrc="https://www.thepensionsregulator.gov.uk/logo.png"
				logoHref="https://www.thepensionsregulator.gov.uk"
				title="Exchange - Scheme return"
				onClickSchemeOptions={onClickSchemeOptions}
				onClickLogout={onClickLogout}
			/>,
		);

		const image = getByAltText('Go to The Pensions Regulator website');
		getByTestId('onClickSchemeOptions').click();
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
		expect(onClickSchemeOptions).toHaveBeenCalledTimes(1);
		expect(onClickLogout).toHaveBeenCalledTimes(1);
		expect(getByText('Exchange - Scheme return')).toBeInTheDocument();
	});
});
