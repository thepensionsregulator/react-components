import { merge } from 'lodash';
import { DefaultTheme } from 'styled-components';

export const mergeThemes = <T extends DefaultTheme>(themes: T[]): T => {
	if (!Array.isArray(themes)) return undefined;
	return merge(themes);
};
