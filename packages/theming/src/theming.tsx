import React, { useState, createContext, useContext, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider, ThemeContext, DefaultTheme } from 'styled-components';
import { mergeThemes } from './utils';

const ThemeProviderContext = createContext({
	setDark: () => {},
	setLight: () => {},
});

export const useTheme = () => {
	const styledComponentsContext = useContext(ThemeContext);
	const customContext = useContext(ThemeProviderContext);

	if (!styledComponentsContext) {
		throw new Error(`Form compound components cannot be rendered outside the Form component`);
	}

	return { ...styledComponentsContext, ...customContext };
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

	function setDark() {
		setTheme(finalDark);
	}

	function setLight() {
		setTheme(finalLight);
	}

	const ui = typeof children === 'function' ? children({ setDark, setLight }) : children;
	return (
		<ThemeProviderContext.Provider value={{ setDark, setLight }}>
			<StyledThemeProvider theme={theme}>{ui}</StyledThemeProvider>
		</ThemeProviderContext.Provider>
	);
};

export default ThemeProvider;

// usage <ThemeProvider theme={[customTheme, componentsTheme]}>{...jsx}</ThemeProvider>
