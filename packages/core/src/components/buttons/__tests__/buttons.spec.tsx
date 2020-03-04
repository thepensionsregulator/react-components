import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Button } from '../';
import lightTheme from '../../../../../theming/src/lightTheme';
import { ThemeProvider } from 'styled-components';

function renderFn(children) {
	const utils = render(
		<ThemeProvider theme={lightTheme}>{children}</ThemeProvider>,
	);
	return { ...utils };
}

describe('Button', () => {
	test('it renders correctly', () => {
		const buttonText = 'click me';
		const { getByText } = renderFn(<Button>{buttonText}</Button>);
		expect(getByText(buttonText)).toHaveTextContent(buttonText);
	});
});
