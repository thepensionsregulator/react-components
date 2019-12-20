export const getObjectValueByString = <T>(obj: T, path: string): T => {
	return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};
