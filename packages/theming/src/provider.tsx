import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import lightTheme from './lightTheme';
import GlobalStyle from './reset.css';

export const ThemeProvider = ({ children }) => {
	return (
		<StyledThemeProvider theme={lightTheme}>
			<>
				<GlobalStyle />
				{children}
			</>
		</StyledThemeProvider>
	);
};
