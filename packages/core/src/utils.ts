import { matchClassName } from './components/globals/globals';

/**
 * @classNames takes an object with key as a class name and value as a boolean to signify if
 * it should be included. It also takes an array of strings and objects same as above
 * */
export const classNames = (classNames: { [key: string]: any } = []) => {
	const joinedNames = [];

	if (Array.isArray(classNames)) {
		for (const className of classNames.flat(Infinity)) {
			if (typeof className === 'string') {
				/** if classname is a string then forward it to the joinedNames */
				joinedNames.push(className);
			}
			if (typeof className === 'object') {
				/** if it's an object then key will be the classname and value will be if it should be used or not */
				for (const key of Object.keys(className)) {
					if (className[key]) {
						joinedNames.push(key);
					}
				}
			}
		}
	}

	if (!Array.isArray(classNames) && typeof classNames === 'object') {
		/** if it's an object then key will be the classname and value will be if it should be used or not */
		for (const key of Object.keys(classNames)) {
			if (classNames[key]) {
				joinedNames.push(key);
			}
		}
	}

	return joinedNames.filter(Boolean).join(' ');
};

/**
 * @filterProps looks over props keys and values to keep class names clean and includes only
 * those that actually exist in the css module.
 */
export const filterProps = (allProps: { [key: string]: any } = {}) => {
	return Object.keys(allProps).reduce((acc, key) => {
		const value = allProps[key];

		if (value) {
			const name = matchClassName(key, value);
			if (!name) return acc;

			return {
				...acc,
				[name]: true,
			};
		}

		return acc;
	}, {});
};
