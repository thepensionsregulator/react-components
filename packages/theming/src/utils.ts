import { merge } from 'lodash';
import { DefaultTheme, css } from 'styled-components';

export const mergeThemes = <T extends DefaultTheme>(themes: T[]): T => {
	if (!Array.isArray(themes)) return undefined;
	return merge(themes);
};

export const respondTo = (sizes: { [key: string]: string }) => {
	return Object.keys(sizes).reduce((accumulator, label: string) => {
		return {
			...accumulator,
			[label]: (...args: any[]) => css`
				@media (min-width: ${sizes[label]}) {
					// @ts-ignore
					${css(...args)}
				}
			`,
		};
	}, {});
};
