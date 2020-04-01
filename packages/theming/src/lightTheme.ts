import { responsive } from './utils';

const breakpoints = ['48em', '64em', '90em', '114em'];

const lightTheme = {
	colors: {
		background: '#FFFFFF',
		primary: {
			100: '#036db8',
			200: '#003078',
			300: '#5e529f',
			400: '#483b88',
			500: '#0b012f',
		},
		neutral: {
			100: '#e8e8e8',
			200: '#b1b4b6',
			300: '#888888',
			900: '#0b0c0c',
		},
		accents: {
			200: '#5e529f',
			300: '#483b88',
			400: '#0b012f',
		},
		success: {
			200: '#207e3b',
			300: '#015e33',
		},
		warning: {
			200: '#ffdd00',
			300: '#e3c502',
		},
		danger: {
			200: '#d4351c',
			300: '#bd2811',
		},
	},
	fonts: {
		serif: "'Open Sans Regular', 'Open Sans', sans-serif",
		sansSerif: "'Open Sans Regular', 'Open Sans', sans-serif",
	},
	space: [10, 15, 20, 25, 30, 40, 50, 60],
	fontSizes: [12, 14, 16, 22, 30, 36],
	fontWeights: [300, 400, 500, 700],
	breakpoints,
	mediaQueries: {
		xs: responsive(breakpoints[0]),
		sm: responsive(breakpoints[1]),
		md: responsive(breakpoints[2]),
		lg: responsive(breakpoints[3]),
	},
	letterSpacings: {
		normal: 'normal',
		tracked: '0.1em',
		tight: '-0.05em',
		mega: '0.25em',
	},
};

export default lightTheme;
