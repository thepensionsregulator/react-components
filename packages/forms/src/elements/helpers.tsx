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
	return dotPos > -1 && dotPos < value.length;
};

export const format = (value: string): string => {
	/*
		receives an integer and returns it with a comma separated format
		e.g  ('12345678') => '12,345,678'
	*/
	const valueFormatted:string = value
		.toString()
		.split('')
		.reverse()
		.join('')
		.match(/.{1,3}/g)
		.join(',')
		.split('')
		.reverse()
		.join('');

	return valueFormatted;
};

export const formatWithDecimals = (value: string, decimals: number): string => {
	/*
		takes a number with containing decimal places 
		and returns it in a comma separated format
		e.g value: ('123456.77') => '123,456.77'
	*/
	// 
	// e.g. decimalsStartPos = 6;
	const decimalsStartPos:number = firstDotPosition(value);
	// e.g. decimalPart = '.77'
	const decimalPart:string = value.slice(decimalsStartPos, decimalsStartPos+1+decimals);
	// e.g. intValues = '123456
	const intValues:string = value.slice(0, decimalsStartPos);
	// e.g. intValueFormatted = '123,456'
	const intValueFormatted:string = format(intValues);

	const valueFormatted:string = intValueFormatted + decimalPart;
	console.log(valueFormatted);

	return valueFormatted;
}