import { useMemo } from 'react';
import { classNames, filterProps, flatten } from '../utils';

export const useClassNames = (
	globalStyles: { [key: string]: any } = {},
	otherStyles: any[] = [],
): string => {
	const styles = useMemo(() => filterProps(globalStyles), [globalStyles]);
	const flattenedStyles = useMemo(
		() => classNames(flatten([otherStyles.filter(Boolean), styles])),
		[otherStyles, styles],
	);
	return flattenedStyles;
};
