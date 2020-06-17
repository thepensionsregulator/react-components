export const truncateString = (str: string, num: number) => {
	return str && str.length > num ? str.slice(0, num).concat('...') : str;
};

export const capitalize = (string) =>
	`${string.charAt(0).toUpperCase()}${string.slice(1, -1)}`;

export const getObjectValueByString = (
	obj: { [key: string]: any },
	path: string,
): unknown => {
	return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};
