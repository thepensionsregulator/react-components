import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ThemeProvider from '@tpr/theming';

export function renderFn(children) {
	const utils = render(<ThemeProvider>{children}</ThemeProvider>);
	return { ...utils };
}
