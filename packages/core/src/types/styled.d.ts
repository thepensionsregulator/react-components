import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			neutral: {
				'100': string;
			};
			accents: {
				features: {
					'100': string;
					'200': string;
					'300': string;
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
		};
	}
}
