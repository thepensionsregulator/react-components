import React from 'react';
import { ThemeProvider } from 'styled-components';
import lightTheme from '../../../../theming/src/lightTheme';
// TODO: maybe create a theme package or export from core for the components theming

export default ({ children }) => <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
