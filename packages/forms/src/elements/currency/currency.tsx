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
	adaptValueToFormat,
	getFinalValueWithFormat,
} from '../helpers';

interface InputCurrencyProps extends FieldRenderProps<number>, FieldExtraProps {
	after?: string;
	before?: string;
	callback?: (e: any) => void;
	decimalPlaces?: number;
	noLeftBorder?: boolean;
	optionalText?: boolean;
	maxInputLength?: number;
}

const InputCurrency: React.FC<InputCurrencyProps> = React.memo(
	({
		label,
		hint,
		input,
		testId,
		meta,
		required,
		placeholder,
		readOnly,
		inputWidth: width,
		cfg,
		after,
		before,
		callback,
		decimalPlaces = 2,
		noLeftBorder,
		optionalText,
		maxInputLength = 16 + decimalPlaces,
		initialValue,
		...props
	}) => {
		const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

		// e.g. format: 999,999,999,999.00

		const [inputValue, setInputValue] = useState<string>('');
		const [dot, setDot] = useState<boolean>(false);

		const formatWithCommas = (value: string): string => {
			const numString: string = value.replace(/,/g, '');
			let numFormatted: string = '';
			// if number is integer
			if (!containsDecimals(value)) {
				// numString = "123456"
				numFormatted = format(numString);
				// numFormatted = "123,456"
				const numWithDecimals: string = fixToDecimals(numString, decimalPlaces);
				setInputValue(
					numFormatted + '.' + numWithDecimals.slice(-decimalPlaces),
				);
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

		const keyPressedIsNotAllowed = (e: any): boolean => {
			if (!digits.includes(e.key) && !validKeys.includes(e.key)) return true;
			return false;
		};

		const handleKeyDown = (e: any) => {
			// managing e.ctrlKey we allow to use the key combinations Ctrl+C, Ctrl+V, Ctrl+X
			if (!(e.ctrlKey === true)) {
				// typing '.' when already exists one in the value
				if (e.key === '.') {
					dot ? e.preventDefault() : setDot(true);
					return true;
				}
				keyPressedIsNotAllowed(e) && e.preventDefault();
			}
		};

		const valueLengthValid = (value: string): boolean => {
			// if the length of the new value (after formatting) is greater than maxInputLength => returns false
			if (value) {
				const newValue = getFinalValueWithFormat(value, decimalPlaces);
				if (newValue.length > maxInputLength) return false;
			}
			return true;
		};

		const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
			// if the new value.length is greater than the maxLength
			if (!valueLengthValid(e.target.value)) {
				e.target.value = inputValue;
			} else {
				if (String(e.target.value)[e.target.value.length - 1] == '.') {
					input.onChange(e.target.value);
				} else {
					input.onChange(e.target.value && formatWithCommas(e.target.value));
				}
				if (!containsDecimals(e.target.value)) setDot(false);
				e.target.value === '' && setInputValue('');
			}
			if (callback) {
				const numericValue = Number(
					adaptValueToFormat(e.target.value.replace(/,/g, ''), decimalPlaces),
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

		const formatInitialValue = (value: number) => {
			const newInitialValue = formatWithCommas(value.toFixed(decimalPlaces));
			setInputValue(newInitialValue);
			innerInput.current.value = newInitialValue;
		};

		const innerInput = useRef(null);

		useEffect(() => {
			if (initialValue !== undefined && initialValue !== null) {
				const myEvent = new Event('blur', { bubbles: true });
				formatInitialValue(initialValue);
				/*
					When initialValue changes from null to a numeric value there is a situation where the format 
					is not correctly applied because somehow the blur event triggers before the value is formatted. 
					Delaying minimally the execution of the blur event solves this problem.
				*/
				setTimeout(() => {
					innerInput.current.dispatchEvent(myEvent);
				}, 50);
			} else {
				setInputValue('');
				innerInput.current.value = null;
				input.onChange(null);
			}
		}, [initialValue]);

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
					readOnly={readOnly}
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
	},
);

export const FFInputCurrency: React.FC<FieldProps> = (fieldProps) => {
	return (
		<Field
			{...fieldProps}
			render={(props) => <InputCurrency {...props} {...fieldProps} />}
		/>
	);
};
