export const truncateString = (str: string, num: number) => {
	return str && str.length > num ? str.slice(0, num).concat('...') : str;
};
