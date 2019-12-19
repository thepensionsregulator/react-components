/**
 *
 * @param {object} obj // takes an object
 * @param {string} path // takes a path to object value as a string
 */
export const getObjectValueByString = (obj, path) => {
	return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};
