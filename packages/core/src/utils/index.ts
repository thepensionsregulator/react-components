export const getObjectValueByString = (obj: object, path: string): unknown => {
	return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};
