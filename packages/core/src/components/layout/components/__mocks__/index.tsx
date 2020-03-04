import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import lightTheme from '../../../../../../theming/src/lightTheme';

export function renderFn(children) {
	const utils = render(
		<ThemeProvider theme={lightTheme}>{children}</ThemeProvider>,
	);
	return { ...utils };
}
