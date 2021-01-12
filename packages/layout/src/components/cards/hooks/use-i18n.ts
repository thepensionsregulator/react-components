import { useMemo } from 'react';
import merge from 'lodash.merge';

export const useI18n = <T, J>(i18nDefaults: T, i18nOverrides: J) => {
	const i18n = useMemo(() => merge(i18nDefaults, i18nOverrides), [
		i18nDefaults,
		i18nOverrides,
	]);

	return i18n;
};
