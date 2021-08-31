import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { FieldExtraProps } from '../../renderFields';
import { StyledInputLabel, InputElementHeading } from '../elements';
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
	getNumberOfCommas,
	calculateCursorPosition,
} from '../helpers';
import { FieldWithAriaLabelExtensionI18nProps } from 'types/FieldWithAriaLabelExtensionI18nProps';
import { FieldWithAriaLabelExtensionProps } from '../../types/FieldWithAriaLabelExtensionProps';
import { RecursivePartial } from 'types/RecursivePartial';
import AccessibilityHelper from '../accessibilityHelper';

let currencyFieldI18nDefaults: FieldWithAriaLabelExtensionI18nProps = {
	ariaLabelExtension: ', in pounds',
};

interface InputCurrencyProps extends FieldRenderProps<number>, FieldExtraProps {
	after?: string;
	before?: string;
	callback?: (e: any) => void;
	decimalPlaces?: number;
	noLeftBorder?: boolean;
	optionalText?: boolean;
	maxInputLength?: number;
	i18n?: RecursivePartial<FieldWithAriaLabelExtensionI18nProps>;
}

const InputCurrency: React.FC<InputCurrencyProps> = React.memo(
	({
		id,
		label,
		hint,
		input,
		testId,
		name,
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
		i18n = currencyFieldI18nDefaults,
		...props
	}) => {
		const currencySymbol = '£';
		const digits = [
			'0',
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'.',
			currencySymbol,
		];

		// e.g. format: 999,999,999,999.00

		const [inputValue, setInputValue] = useState<string>('');
		const [formattedInputValue, setFormattedInputValue] = useState<string>('');
		const [dot, setDot] = useState<boolean>(false);
		const [cursorPos, setCursorPos] = useState(null);
		const [delKey, setDelKey] = useState<boolean>(false);

		const formatWithCommas = (value: string): string => {
			const hasCurrencySymbol = value && value[0] === currencySymbol;

			const numString: string = value
				.replace(/,/g, '')
				.replace(currencySymbol, '');

			if (numString === '') return value;

			let numFormatted: string = '';
			// if number is integer
			if (!containsDecimals(value)) {
				// numString = "123456"
				numFormatted =
					(hasCurrencySymbol ? currencySymbol : '') + format(numString);
				// numFormatted = "123,456"
				const numWithDecimals: string = fixToDecimals(numString, decimalPlaces);
				setFormattedInputValue(
					numFormatted + '.' + numWithDecimals.slice(-decimalPlaces),
				);
			}
			// if number has decimals
			else {
				// numString = "123456.77"
				numFormatted =
					(hasCurrencySymbol ? currencySymbol : '') +
					formatWithDecimals(numString, decimalPlaces);
				// numFormatted = "123,456.77"
				setFormattedInputValue(numFormatted);
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
				if (e.key === currencySymbol) {
					if (e.target.value.length !== 0) e.preventDefault();
					return true;
				}
				keyPressedIsNotAllowed(e) && e.preventDefault();
				// we save the position of the cursorwhen the key is pressed
				setCursorPos(e.target.selectionStart);
				e.key === 'Delete' ? setDelKey(true) : setDelKey(false);
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
			const commasBefore: number = getNumberOfCommas(inputValue, cursorPos);
			// if the new value.length is greater than the maxLength, keeps the previous value
			if (!valueLengthValid(e.target.value)) {
				e.target.value = formattedInputValue;
			} else {
				setInputValue(e.target.value);
				if (String(e.target.value)[e.target.value.length - 1] == '.') {
					input.onChange(e.target.value);
				} else {
					if (e.target.value) {
						e.target.value = formatWithCommas(e.target.value);
						// we only adjust the cursor position when the cursor is not at the end of the input.value
						if (cursorPos !== e.target.value.length) {
							[
								e.target.selectionStart,
								e.target.selectionEnd,
							] = calculateCursorPosition(
								cursorPos,
								e,
								inputValue,
								commasBefore,
								delKey,
							);
						}
						setInputValue(e.target.value);
						input.onChange(e.target.value && e.target.value);
					} else input.onChange(null);
				}
				if (!containsDecimals(e.target.value)) setDot(false);
				e.target.value === '' && setFormattedInputValue('');
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
				getNumDecimalPlaces(formattedInputValue) < decimalPlaces
					? appendMissingZeros(
							inputValue.replace(/,/g, '').replace(currencySymbol, ''),
							decimalPlaces,
					  )
					: formattedInputValue.replace(currencySymbol, '');
			setInputValue(e.target.value);
			input.onChange(e);
		};

		const formatInitialValue = (value: number) => {
			const newInitialValue = formatWithCommas(value.toFixed(decimalPlaces));
			setFormattedInputValue(newInitialValue);
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
					innerInput.current && innerInput.current.dispatchEvent(myEvent);
				}, 100);
			} else {
				setFormattedInputValue('');
				setInputValue('');
				innerInput.current.value = null;
				input.onChange(null);
			}
		}, [initialValue]);

		const helper = new AccessibilityHelper(name, !!label, !!hint);

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
					accessibilityHelper={helper}
				/>
				<Input
					id={id}
					name={name}
					ref={innerInput}
					type="text"
					width={width}
					testId={testId}
					label={label}
					ariaLabelExtension={i18n.ariaLabelExtension}
					isError={meta && meta.touched && meta.error}
					placeholder={placeholder}
					readOnly={readOnly}
					decimalPlaces={decimalPlaces}
					{...input}
					onKeyDown={handleKeyDown}
					onChange={handleOnChange}
					onBlur={handleBlur}
					after={after}
					before={before}
					accessibilityHelper={helper}
					required={required}
					{...props}
				/>
			</StyledInputLabel>
		);
	},
);

export const FFInputCurrency: React.FC<FieldWithAriaLabelExtensionProps> = (
	fieldProps,
) => {
	return (
		<Field
			{...fieldProps}
			render={(props) => (
				<InputCurrency
					{...props}
					name={fieldProps.name}
					initialValue={fieldProps.initialValue}
				/>
			)}
		/>
	);
};
