import React from 'react';
import { ThemeProvider } from 'styled-components';

// TODO: maybe create a theme package or export from core for the components theming

const theme = {
	colors: {
		neutral: {
			200: '#b1b4b6',
			300: '#0b0c0c',
		},
		features: {
			accents: {
				200: '#1d70b8',
				300: '#003078',
				400: '#4c2c92',
				500: '#0b0c0c',
			},
			success: {
				200: '#00703c',
			},
			warning: {
				200: '#ffdd00',
			},
			danger: {
				200: '#d4351c',
			},
		},
	},
};

export default ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
