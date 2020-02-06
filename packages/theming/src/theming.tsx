import React, { useState, createContext, useContext, useMemo } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { mergeThemes } from './utils';

const ColorSchemeContext = createContext({
	setDark: () => {},
	setLight: () => {},
});

export const useColorSchemeContext = () => {
	const utils = useContext(ColorSchemeContext);
	if (!utils) {
		throw new Error(`Compound components cannot be rendered outside the ColorScheme`);
	}
	return utils;
};

type ColorSchemeProps<T> = {
	light: T | T[];
	dark?: T | T[];
	autoDetect?: boolean;
	children: any;
};

const ColorScheme = <T extends DefaultTheme>({
	children,
	light,
	dark,
	autoDetect = false,
}: ColorSchemeProps<T>): JSX.Element => {
	const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

	const finalLight = useMemo(() => (Array.isArray(light) ? mergeThemes(light) : light), [light]);
	const finalDark = useMemo(() => (Array.isArray(dark) ? mergeThemes(dark) : dark), [dark]);

	const [colorScheme] = useState(autoDetect ? (prefersDark ? 'dark' : 'light') : 'light');
	const [theme, setTheme] = useState(colorScheme === 'light' ? finalLight : finalDark);

	const setLight = () => setTheme(finalLight);
	const setDark = () => autoDetect && finalDark && setTheme(finalDark);

	const utils = { setLight, setDark };
	const ui = typeof children === 'function' ? children(utils) : children;

	return (
		<ColorSchemeContext.Provider value={utils}>
			<ThemeProvider theme={theme}>{ui}</ThemeProvider>
		</ColorSchemeContext.Provider>
	);
};

export default ColorScheme;
