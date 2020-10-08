export const firstDotPosition = (num: string): number => {
	// detects if the number contains (.) for decimals
	return num.indexOf('.');
};

export const parseToDecimals = (num: string, decimals: number): number => {
	const firstDot = firstDotPosition(num);
	// if contains decimals, only allow n number of decimals
	// to avoid unnexpected rounds when using toFixed() in handleBlur
	if (firstDot > -1) {
		let newNum = num.slice(0, firstDot + decimals + 1);
		return Number(newNum);
	} else return Number(num);
};

export const fixToDecimals = (value: string, decimals: number): string => {
	return Number(value).toFixed(decimals);
};
