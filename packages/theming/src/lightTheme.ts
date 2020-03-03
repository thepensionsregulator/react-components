import { respondTo } from './utils';

const breakpoints = ['48em', '64em', '90em', '114em'];

const lightTheme = {
	colors: {
		background: '#FFFFFF',
		primary: {
			200: '#1d70b8',
			300: '#003078',
			400: '#4c2c92',
			500: '#0b0c0c',
		},
		neutral: {
			100: '#e8e8e8',
			200: '#b1b4b6',
			300: '#888888',
			900: '#0b0c0c',
		},
		success: {
			200: '#00703c',
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
	mediaQueries: respondTo(
		['xs', 'sm', 'md', 'lg'].reduce(
			(acc, val, index) =>
				Object.assign(acc, {
					[val]: breakpoints[index],
				}),
			{},
		),
	),
	letterSpacings: {
		normal: 'normal',
		tracked: '0.1em',
		tight: '-0.05em',
		mega: '0.25em',
	},
};

export default lightTheme;
