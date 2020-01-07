import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Button } from '../';
import lightTheme from '../../../../../theming/src/lightTheme';
import { ThemeProvider } from 'styled-components';

function renderFn(children) {
	const utils = render(<ThemeProvider theme={lightTheme}>{children}</ThemeProvider>);
	return { ...utils };
}

describe('Button', () => {
	test('it renders correctly', () => {
		const { container } = renderFn(<Button />);
		expect(container.firstChild).toMatchInlineSnapshot(`
		<button
		  class="sc-bdVaJa Hkyna"
		  type="button"
		>
		  <span />
		</button>
	`);
	});
});
