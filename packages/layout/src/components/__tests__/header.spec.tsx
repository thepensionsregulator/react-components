import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Header } from '../header/header';

describe('Header', () => {
	test('it renders correctly', () => {
		const onClickSchemeOptions = jest.fn();
		const onClickLogout = jest.fn();
		const { getByTestId, getByText, getByAltText } = render(
			<Header
				logoUrl="https://www.thepensionsregulator.gov.uk"
				title="Exchange - Scheme return"
				onClickSchemeOptions={onClickSchemeOptions}
				onClickLogout={onClickLogout}
			/>,
		);

		const image = getByAltText('TPR Logo');
		getByTestId('onClickSchemeOptions').click();
		getByTestId('onClickLogout').click();

		expect(image).toHaveAttribute(
			'src',
			'https://www.thepensionsregulator.gov.uk',
		);
		expect(onClickSchemeOptions).toHaveBeenCalledTimes(1);
		expect(onClickLogout).toHaveBeenCalledTimes(1);
		expect(getByText('Exchange - Scheme return')).toBeInTheDocument();
	});
});
