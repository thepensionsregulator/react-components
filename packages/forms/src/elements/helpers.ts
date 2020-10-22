export const validKeys = [
	'Backspace',
	'Enter',
	'Delete',
	'ArrowUp',
	'ArrowDown',
	'ArrowLeft',
	'ArrowRight',
	'Home',
	'End',
	'Tab',
];

export const firstDotPosition = (num: string): number => {
	// detects if the number contains '.' and returns its index
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
	// returns the value with the specified number of decimal places
	return Number(value).toFixed(decimals);
};

export const containsDecimals = (value: string): boolean => {
	// returns TRUE or FALSE whether if Value contains decimals or not
	const dotPos: number = firstDotPosition(value);
	return dotPos > -1 && dotPos < value.length;
};

export const format = (value: string): string => {
	/*
		receives an integer and returns it with a comma separated format
		e.g  ('12345678') => '12,345,678'
	*/
	const valueFormatted: string = value
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

export const getIntPart = (value: string): string => {
	// e.g value: ('123456.77') => '123456'
	const intPart = value.slice(0, firstDotPosition(value));
	if (Number(intPart) === 0) return '0';
	else return intPart;
};

export const getDecimalPart = (value: string, decimals: number): string => {
	// e.g value: ('123456.77') => '.77'
	const dotPos: number = firstDotPosition(value);
	return value.slice(dotPos, dotPos + 1 + decimals);
};

export const getNumDecimalPlaces = (value): number => {
	// e.g value: ('123456.77') => 2
	const dotPos: number = firstDotPosition(value);
	return value.slice(dotPos + 1).length;
};

export const formatWithDecimals = (value: string, decimals: number): string => {
	/*
		takes a number with containing decimal places 
		and returns it in a comma separated format
		e.g value: ('123456.77') => '123,456.77'
	*/
	// e.g. intValueFormatted = '123,456'
	const intValueFormatted: string = format(getIntPart(value));
	// e.g. decimalPart = '.77'
	const decimalPart: string = getDecimalPart(value, decimals);
	// e.g. returns '123,456.77
	return intValueFormatted + decimalPart;
};

export const appendMissingZeros = (value: string, decimals: number): string => {
	if (value !== '') {
		let decimalPart = getDecimalPart(value, decimals);

		if (decimalPart.length < decimals + 1) {
			const intValueFormatted: string = format(getIntPart(value));
			decimalPart = decimalPart.padEnd(decimals + 1, '0');
			return intValueFormatted + decimalPart;
		}
	}
	return value;
};

export const validateCurrency = (
	value: string,
	min: number | null,
	max: number | null,
) => {
	/*
		receives a number (as string in comma separated format), 
						 the minimum value for the field or null
						 the maximum value for the field or null
		returns	
						'tooSmall' when the value is < min
						'tooBig' when the value is > max
						'empty' when the field is empty
	*/
	if (value !== undefined && value !== null) {
		const numericValue = Number(value.replace(/,/g, ''));
		if (min && numericValue < min) return 'tooSmall';
		if (max && numericValue > max) return 'tooBig';
		return undefined;
	}
	return 'empty';
};
