import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Button } from '../';
import ThemeProvider from '@tpr/theming';

function renderFn(children) {
	const utils = render(<ThemeProvider>{children}</ThemeProvider>);
	return { ...utils };
}

describe('Button', () => {
	test('it renders correctly', () => {
		const buttonText = 'click me';
		const { getByText } = renderFn(<Button>{buttonText}</Button>);
		expect(getByText(buttonText)).toHaveTextContent(buttonText);
	});
});
