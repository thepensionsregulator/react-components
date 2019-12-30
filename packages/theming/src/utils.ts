import { mergeDeepLeft } from 'ramda';
import { DefaultTheme } from 'styled-components';

export const mergeThemes = (themes: DefaultTheme[]): DefaultTheme => {
	if (!Array.isArray(themes)) return undefined;
	return mergeDeepLeft(themes);
};
