import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './reset.css';
import lightTheme from '../../../packages/theming/src/lightTheme';

export default ({ children }) => (
	<ThemeProvider theme={lightTheme}>
		<GlobalStyle />
		{children}
	</ThemeProvider>
);
