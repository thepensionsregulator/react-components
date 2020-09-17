export const parseToDecimals = (num: string, decimals: number): number => {
	// first we detect if the number already contains decimals
	const firstDot = num.indexOf('.');
	// if contains decimals, only allow n number of decimals
	// to avoid unnexpected rounds when using toFixed() in handleBlur
	if (firstDot > -1) {
		let newNum = num.slice(0, firstDot + decimals + 1);
		return Number(newNum);
	} else return Number(num);
};

export const handleBlur = (value: string, decimals: number): string => {
	return Number(value).toFixed(decimals);
};
