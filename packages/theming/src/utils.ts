import { merge } from 'lodash';
import { DefaultTheme, css } from 'styled-components';

export const mergeThemes = <T extends DefaultTheme>(themes: T[]): T => {
	if (!Array.isArray(themes)) return undefined;
	return merge(themes);
};

export const respondTo = sizes => {
	return Object.keys(sizes).reduce((accumulator, label: 'xs' | 'sm' | 'md' | 'lg') => {
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
