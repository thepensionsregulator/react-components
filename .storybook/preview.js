import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import lightTheme from '../packages/theming/src/lightTheme';
import GlobalStyle from './reset.css';

addDecorator(storyFn => (
	<ThemeProvider theme={lightTheme}>
		<>
			<GlobalStyle />
			{storyFn()}
		</>
	</ThemeProvider>
));
