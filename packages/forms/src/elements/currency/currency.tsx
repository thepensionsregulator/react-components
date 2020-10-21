import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { Input } from '../input/input';
import {
	validKeys,
	format,
	formatWithDecimals,
	containsDecimals,
	fixToDecimals,
	getNumDecimalPlaces,
	appendMissingZeros,
	parseToDecimals,
} from '../helpers';

interface InputCurrencyProps extends FieldRenderProps<number>, FieldExtraProps {
	after?: string;
	before?: string;
	callback?: (e: any) => void;
	decimalPlaces?: number;
	noLeftBorder?: boolean;
	optionalText?: boolean;
	maxInputLength?: number;
	initialV?: number;
}

const InputCurrency: React.FC<InputCurrencyProps> = ({
	label,
	hint,
	input,
	testId,
	meta,
	required,
	placeholder,
	inputWidth: width,
	cfg,
	after,
	before,
	callback,
	decimalPlaces = 2,
	noLeftBorder,
	optionalText,
	maxInputLength = 16 + decimalPlaces,
	initialV,
	...props
}) => {
	const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

	// e.g. format: 999,999,999,999.00

	const [inputValue, setInputValue] = useState<string>('');
	const [dot, setDot] = useState<boolean>(false);
	const [firstLoad, setFirstLoad] = useState<boolean>(true);

	const formatWithCommas = (value: string): string => {
		const numString: string = value.replace(/,/g, '');
		let numFormatted: string = '';
		// if number is integer
		if (!containsDecimals(value)) {
			// numString = "123456"
			numFormatted = format(numString);
			// numFormatted = "123,456"
			const numWithDecimals: string = fixToDecimals(numString, decimalPlaces);
			setInputValue(numFormatted + '.' + numWithDecimals.slice(-decimalPlaces));
		}
		// if number has decimals
		else {
			// numString = "123456.77"
			numFormatted = formatWithDecimals(numString, decimalPlaces);
			// numFormatted = "123,456.77"
			setInputValue(numFormatted);
		}
		return numFormatted;
	};

	const handleKeyDown = (e: any) => {
		// typing '.' when already exists one in the value
		if (e.key === '.') {
			dot ? e.preventDefault() : setDot(true);
			return true;
		}
		// if the input has reached the maximum length
		if (e.target.value.length >= maxInputLength) {
			// only allow the validKeys
			!validKeys.includes(e.key) && e.preventDefault();
		} else {
			if (!digits.includes(e.key) && !validKeys.includes(e.key))
				e.preventDefault();
		}
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
		if (String(e.target.value)[e.target.value.length - 1] == '.') {
			input.onChange(e.target.value);
		} else {
			input.onChange(e.target.value && formatWithCommas(e.target.value));
		}
		if (!containsDecimals(e.target.value)) setDot(false);
		e.target.value === '' && setInputValue('');
		if (callback) {
			const numericValue = parseToDecimals(
				e.target.value.replace(/,/g, ''),
				decimalPlaces,
			);
			e.target.value === ''
				? callback(null)
				: callback(Number(numericValue.toFixed(decimalPlaces)));
		}
	};

	const handleBlur = (e: any): void => {
		input.onBlur(e);
		e.target.value =
			getNumDecimalPlaces(inputValue) < decimalPlaces
				? appendMissingZeros(inputValue.replace(/,/g, ''), decimalPlaces)
				: inputValue;
		input.onChange(e);
	};

	const innerInput = useRef(null);

	useEffect(() => {
		// if "initialV" is specified, it needs to trigger manually the onBlur event to apply the format
		const myEvent = new Event('blur', { bubbles: true });
		if (initialV) {
			const newInitialValue = formatWithCommas(initialV.toFixed(decimalPlaces));
			setInputValue(newInitialValue);
			innerInput.current.value = newInitialValue;
			setFirstLoad(false);
			innerInput.current.dispatchEvent(myEvent);
		}
	}, [firstLoad]);

	return (
		<StyledInputLabel
			isError={meta && meta.touched && meta.error}
			cfg={Object.assign({ flexDirection: 'column', mt: 1 }, cfg)}
			noLeftBorder={noLeftBorder}
		>
			<InputElementHeading
				label={label}
				required={optionalText !== undefined ? !optionalText : required}
				hint={hint}
				meta={meta}
			/>
			<Input
				parentRef={innerInput}
				type="text"
				width={width}
				testId={testId}
				label={label}
				touched={meta && meta.touched && meta.error}
				placeholder={placeholder}
				decimalPlaces={decimalPlaces}
				{...input}
				onKeyDown={handleKeyDown}
				onChange={handleOnChange}
				onBlur={handleBlur}
				after={after}
				before={before}
				{...props}
			/>
		</StyledInputLabel>
	);
};

export const FFInputCurrency: React.FC<FieldProps> = (fieldProps) => {
	return <Field {...fieldProps} component={InputCurrency} />;
};
