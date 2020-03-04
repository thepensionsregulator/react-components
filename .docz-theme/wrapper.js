import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './reset.css';
import { lightTheme } from '../packages/theming/lib/index';

const Wrapper = ({ children }) => {
	return (
		<ThemeProvider theme={lightTheme}>
			<>
				<GlobalStyle />
				{children}
			</>
		</ThemeProvider>
	);
};

export default Wrapper;
