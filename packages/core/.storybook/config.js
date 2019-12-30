import React from 'react';
import { configure, addDecorator } from '@storybook/react';
// import { withA11y } from '@storybook/addon-a11y';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './reset.css';
import theme from './theme';
// import 'storybook-chromatic';

// addDecorator(withA11y);
addDecorator(story => (
	<ThemeProvider theme={theme}>
		<>
			<GlobalStyle />
			{story()}
		</>
	</ThemeProvider>
));

configure(require.context('../src', true, /\.(stories|story)\.(ts|tsx)$/), module);
