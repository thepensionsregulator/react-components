import { useMemo } from 'react';
import { classNames, filterProps } from '../utils';

const useClassNames = (
	globalStyles: { [key: string]: any } = {},
	otherStyles: any[] = [],
): string => {
	const styles = useMemo(() => filterProps(globalStyles), [globalStyles]);
	const flattenedStyles = useMemo(
		() => classNames([otherStyles.filter(Boolean), styles].flat(Infinity)),
		[otherStyles, styles],
	);
	return flattenedStyles;
};

export default useClassNames;
