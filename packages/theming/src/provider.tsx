import React from 'react';
import baseStyled, {
	ThemeProvider as StyledThemeProvider,
	ThemedStyledInterface,
} from 'styled-components';
import lightTheme from './lightTheme';
import GlobalStyle from './reset.css';

export type Theme = typeof lightTheme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;

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
