import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			primary: {
				200: string;
				300: string;
				400: string;
				500: string;
			};
			neutral: {
				'100': string;
			};
			danger: {
				'200': string;
			};
			warning: {
				'200': string;
			};
			success: {
				'200': string;
			};
		};
		fonts: {
			serif: string;
			sansSerif: string;
		};
		space: number[];
		fontSizes: number[];
		fontWeights: number[];
		breakpoints: number[];
		letterSpacings: {
			normal: string;
			tracked: string;
			tight: string;
			mega: string;
		};
	}
}
