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

export const containsDecimals = (value: string): boolean => {
	const dotPos: number = firstDotPosition(value);
	return dotPos < value.length;
};

export const formatThousands = (value: string, decimals: number): string => {
	console.log(decimals);
	// get integer
	const numInt: number = Math.floor(Number(value));

	// get decimals
	//const decPart: string = (Number(value) - numInt).toFixed(decimals);

	// add commas to integer
	const a = numInt
		.toString()
		.split('')
		.reverse()
		.join('')
		.match(/.{1,3}/g)
		.join(',')
		.split('')
		.reverse()
		.join('');
	//.concat('.', decPart.substr(2));

	return a;
};
