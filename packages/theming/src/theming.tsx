import React, { useState, createContext, useContext, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider, ThemeContext, DefaultTheme } from 'styled-components';
import { mergeThemes } from './utils';

const ThemeProviderContext = createContext({
	setDark: () => {},
	setLight: () => {},
});

export const useThemeContext = () => {
	const styledComponentsUtils = useContext(ThemeContext);
	const themeControlsUtils = useContext(ThemeProviderContext);

	if (!styledComponentsUtils || !themeControlsUtils) {
		throw new Error(`Compound components cannot be rendered outside the ThemeProvider`);
	}

	return { ...styledComponentsUtils, ...themeControlsUtils };
};

type ThemeProviderProps = {
	lightTheme: DefaultTheme | DefaultTheme[];
	darkTheme?: DefaultTheme | DefaultTheme[];
	autoDetect?: boolean;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({
	children,
	lightTheme: light,
	darkTheme: dark,
	autoDetect = false,
}) => {
	const finalLight = useMemo(() => (typeof light === 'object' ? light : mergeThemes(light)), [light]);
	const finalDark = useMemo(() => (typeof dark === 'object' ? dark : mergeThemes(dark)), [dark]);

	const [colorScheme] = useState(
		window.matchMedia ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : 'light',
	);
	const [theme, setTheme] = useState(autoDetect && colorScheme === 'dark' ? finalDark : finalLight || finalLight);

	const setLight = () => finalLight && setTheme(finalLight);
	const setDark = () => finalDark && setTheme(finalDark);

	const ui = typeof children === 'function' ? children({ setDark, setLight }) : children;

	return (
		<ThemeProviderContext.Provider value={{ setDark, setLight }}>
			<StyledThemeProvider theme={theme}>{ui}</StyledThemeProvider>
		</ThemeProviderContext.Provider>
	);
};

export default ThemeProvider;
