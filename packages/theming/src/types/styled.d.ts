import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			background: string;
			primary: {
				200: string;
				300: string;
				400: string;
				500: string;
			};
			neutral: {
				100: string;
				200: string;
				300: string;
				900: string;
			};
			success: {
				200: string;
				300: string;
			};
			warning: {
				200: string;
				300: string;
			};
			danger: {
				200: string;
				300: string;
			};
		};
		fonts: {
			serif: string;
			sansSerif: string;
		};
		space: number[];
		fontSizes: number[];
		fontWeights: number[];
		breakpoints: string[];
		mediaQueries?: {
			xs?: Function;
			sm?: Function;
			md?: Function;
			lg?: Function;
		};
		letterSpacings: {
			normal: string;
			tracked: string;
			tight: string;
			mega: string;
		};
	}
}
