import React from 'react';
import { ThemeProvider } from 'styled-components';
import lightTheme from '../../../packages/theming/src/lightTheme';
import GlobalConfig from '../../../packages/theming/src/reset.css';

export default ({ children }) => (
	<ThemeProvider theme={lightTheme}>
		<>
			<GlobalConfig />
			{children}
		</>
	</ThemeProvider>
);
