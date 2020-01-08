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

export const hexToRgb = (hex: string): number[] => {
	return hex
		.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
		.substring(1)
		.match(/.{2}/g)
		.map(x => parseInt(x, 16));
};

export const textColorFromRgb = <T = '#FFFFFF', U = '#000000'>(
	[r, g, b]: number[],
	lightColor?: T,
	darkColor?: U,
): T | U => {
	if (r * 0.299 + g * 0.587 + b * 0.114 > 186) {
		return darkColor;
	}
	return lightColor;
};

export const textColorFromHex = (hex: string): string => textColorFromRgb(hexToRgb(hex));
