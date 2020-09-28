export const truncateString = (str: string, num: number) => {
	return str && str.length > num ? str.slice(0, num).concat('...') : str;
};

export const capitalize = string =>
	`${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const getObjectValueByString = (
	obj: { [key: string]: any },
	path: string,
): unknown => {
	return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const callAllEventHandlers = (...fns: Function[]) => {
	return (event: unknown, ...args: unknown[]) =>
		fns.some(fn => fn && fn(event, ...args));
};

export const splitObjectIntoTwo = <T>(obj: T, fields = []): [any, any] => {
	const mainObj = {};
	const extractedObj = {};

	for (let key of Object.keys(obj)) {
		if (!fields.includes(key)) {
			mainObj[key] = obj[key];
		}
		if (fields.includes(key)) {
			extractedObj[key] = obj[key];
		}
	}

	return [mainObj, extractedObj];
};
