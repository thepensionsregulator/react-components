import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Footer } from '../footer';
import { ThemeProvider } from 'styled-components';
import lightTheme from '../../../../../../theming/src/lightTheme';

function renderFn(children) {
	const utils = render(
		<ThemeProvider theme={lightTheme}>{children}</ThemeProvider>,
	);
	return { ...utils };
}

describe('Footer', () => {
	test('it renders with menus', () => {
		const menus = [
			[{ title: 'm-link number 1', url: '#' }],
			[{ title: 'm-link number 2', url: '#' }],
			[{ title: 'm-link number 3', url: '#' }],
		];

		const { getAllByText } = renderFn(<Footer menus={menus} links={[]} />);

		const menuLinks = getAllByText(/m-link number/i);

		expect(menuLinks).toBeDefined();
		expect(menuLinks).toHaveLength(menus.length);
		menus.map((menu, index) => expect(menu).toHaveLength(menus[index].length));
	});

	test('it renders with links', () => {
		const links = [
			{ title: 'b-link number 1', url: '#' },
			{ title: 'b-link number 2', url: '#' },
			{ title: 'b-link number 3', url: '#' },
		];

		const { getAllByText } = renderFn(<Footer menus={[]} links={links} />);

		const bottomLinks = getAllByText(/b-link number/i);

		expect(bottomLinks).toBeDefined();
		expect(bottomLinks).toHaveLength(links.length);
	});

	test('it renders copyright correctly', () => {
		const { getByText } = renderFn(<Footer menus={[]} links={[]} />);
		expect(getByText('© The Pensions Regulator')).toBeInTheDocument();
	});
});
