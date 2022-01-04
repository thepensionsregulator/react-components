import { ChangeEvent } from 'react';

const currencySymbol = '£';

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

export const isNumeric = (value: string): boolean => {
	const pattern = /[a-zA-Z]/g
	return !pattern.test(value);
}

export const firstDotPosition = (num: string): number => {
	// detects if the number contains '.' and returns its index
	return num.indexOf('.');
};

export const adaptValueToFormat = (num: string, decimals: number): string => {
	const firstDot = firstDotPosition(num);
	// if contains decimals, only allow n number of decimals
	// to avoid unnexpected rounds when using toFixed() in handleBlur
	if (firstDot > -1) {
		return num.slice(0, firstDot + decimals + 1);
	} else return num;
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

export const getFinalValueWithFormat = (
	value: string,
	decimals: number,
): string => {
	const newValueWithNoCommasOrCurrencySymbol = value
		.replace(/,/g, '')
		.replace(currencySymbol, '');
	if (firstDotPosition(newValueWithNoCommasOrCurrencySymbol) === -1) {
		// if the value doesn't contain decimals, we return the value with the required format
		const newValueWithDecimals = newValueWithNoCommasOrCurrencySymbol.concat(
			'.',
			new Array(decimals).fill('0').join(''),
		);
		return formatWithDecimals(newValueWithDecimals, decimals);
	}
	return value;
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
		const numericValue = Number(
			value.toString().replace(/,/g, '').replace(currencySymbol, ''),
		);
		if (min !== null && numericValue < min) return 'tooSmall';
		if (max !== null && numericValue > max) return 'tooBig';
		return undefined;
	}
	return 'empty';
};

export const getNumberOfCommas = (value: string, pos?: number): number => {
	if (!value) return 0;
	if (pos > 0) {
		return value.slice(0, pos).match(/,/g)
			? value.slice(0, pos).match(/,/g).length
			: 0;
	} else return value.match(/,/g) ? value.match(/,/g).length : 0;
};

export const calculateCursorPosition = (
	cursor: number,
	ev: ChangeEvent<HTMLInputElement> | any,
	prevValue: string,
	commasBefore: number,
	delKey: boolean,
) => {
	/*
		Calculates the position of the cursor for the FFInputCurrency component when the onChange event occurs.
		Because the component applies the comma-separated format to the value, it is very often when the number of chars,
		in specific, the number of 'commas' before the cursor is not always the same when adding or deleting digits.
		Therefore we need to calculate many different scenarios.
		This calculations will be accurate only when the user adds or deletes digits one at the time and not when selecting multiple digits.
	*/

	if (delKey) {
		// when pressing the 'Delete' key
		if (cursor === 0) {
			// cursor at the beggining of the input.value
			ev.target.selectionStart = cursor;
			ev.target.selectionEnd = cursor;
		} else {
			const newCommasBefore: number = getNumberOfCommas(
				ev.target.value,
				cursor,
			);
			ev.target.selectionStart =
				commasBefore > newCommasBefore ? cursor - 1 : cursor;
			ev.target.selectionEnd =
				commasBefore > newCommasBefore ? cursor - 1 : cursor;
		}
	} else {
		if (cursor === 0) {
			// cursor at the beggining of the input.value
			ev.target.selectionStart = 1;
			ev.target.selectionEnd = 1;
		} else {
			// when the cursor is NOT at the beggining of the input.value
			const newCommasBefore: number = getNumberOfCommas(
				ev.target.value,
				cursor,
			);
			if (ev.target.value.length > prevValue.length) {
				// when the new value is longer than the previous there might be a case
				// where the number of commas before the cursor is greater than before
				ev.target.selectionStart =
					newCommasBefore > commasBefore ? cursor + 2 : cursor + 1;
				ev.target.selectionEnd =
					newCommasBefore > commasBefore ? cursor + 2 : cursor + 1;
			}
			if (ev.target.value.length < prevValue.length) {
				if (newCommasBefore < commasBefore) {
					// this will only be accurate when deleting one char and not when deleting multiple
					ev.target.selectionStart = cursor - 2;
					ev.target.selectionEnd = cursor - 2;
				} else {
					// newCommasBefore > commasBefore  || newCommasBefore === commasBefore
					ev.target.selectionStart =
						ev.target.value[cursor - 2] === ',' ? cursor - 2 : cursor - 1;
					ev.target.selectionEnd =
						ev.target.value[cursor - 2] === ',' ? cursor - 2 : cursor - 1;
				}
			}
		}
	}

	return [ev.target.selectionStart, ev.target.selectionEnd];
};
