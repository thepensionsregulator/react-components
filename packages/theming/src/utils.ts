import { mergeDeepLeft } from 'ramda';

export const mergeThemes = <T extends object>(themes: T[] = []) => {
	if (!themes) return undefined;
	return mergeDeepLeft(themes);
};
