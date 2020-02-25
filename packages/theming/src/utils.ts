import { css } from 'styled-components';

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
		.replace(
			/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
			(_, r, g, b) => '#' + r + r + g + g + b + b,
		)
		.substring(1)
		.match(/.{2}/g)
		.map(x => parseInt(x, 16));
};

export const textColorFromRgb = <T extends string, K extends string>(
	[r, g, b]: number[],
	lightColor: T = '#FFFFFF' as T,
	darkColor: K = '#000000' as K,
): T | K => {
	const equation = (r * 299 + g * 587 + b * 114) / 1000;
	if (equation >= 128) return darkColor;
	return lightColor;
};

export const textColorFromHex = (
	hex: string,
	light?: string,
	dark?: string,
): string => textColorFromRgb(hexToRgb(hex), light, dark);
