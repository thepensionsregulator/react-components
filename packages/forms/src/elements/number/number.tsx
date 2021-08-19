import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldExtraProps } from '../../renderFields';
import { Input } from '../input/input';
import { adaptValueToFormat, fixToDecimals, validKeys as vk } from '../helpers';
import { FieldWithAriaLabelExtensionI18nProps } from 'types/FieldWithAriaLabelExtensionI18nProps';
import { FieldWithAriaLabelExtensionProps } from '../../types/FieldWithAriaLabelExtensionProps';
import { RecursivePartial } from 'types/RecursivePartial';
import AccessibilityHelper from '../accessibilityHelper';

let numberFieldI18nDefaults: FieldWithAriaLabelExtensionI18nProps = {
	ariaLabelExtension: null,
};

interface InputNumberProps extends FieldRenderProps<number>, FieldExtraProps {
	after?: string;
	before?: string;
	callback?: (e: any) => void;
	decimalPlaces?: number;
	noLeftBorder?: boolean;
	optionalText?: boolean;
	maxLength?: number;
	maxIntDigits?: number;
	i18n?: RecursivePartial<FieldWithAriaLabelExtensionI18nProps>;
	wrapperElement?: 'label' | 'div' | 'fieldset';
}

const InputNumber: React.FC<InputNumberProps> = ({
	id,
	label,
	name,
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
	decimalPlaces,
	noLeftBorder,
	optionalText,
	maxLength,
	maxIntDigits,
	i18n = numberFieldI18nDefaults,
	initialValue,
	wrapperElement = 'label',
	...props
}) => {
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
		'-',
		'+',
	];
	const validKeys = [...vk, ...digits];

	const [prevValue, setPrevValue] = useState<string | null>(null);
	const innerInput = useRef(null);

	const setInitialDisplayValue = (initialDisplayValue) => {
		const formattedInitialValue = fixToDecimals(
			initialDisplayValue.toString(),
			decimalPlaces,
		);

		if (innerInput.current.value === formattedInitialValue) {
			return;
		}

		innerInput.current.value = formattedInitialValue;
		// /*
		// 		When initialValue changes from null to a numeric value there is a situation where the format
		// 		is not correctly applied because somehow the blur event triggers before the value is formatted.
		// 		Delaying minimally the execution of the blur event solves this problem.
		// 	*/
		setTimeout(() => {
			innerInput.current &&
				innerInput.current.dispatchEvent(new Event('blur', { bubbles: true }));
		}, 100);
	};

	useEffect(() => {
		if (
			innerInput.current.defaultValue === undefined ||
			innerInput.current.defaultValue === null ||
			innerInput.current.defaultValue === ''
		) {
			return;
		}

		setInitialDisplayValue(innerInput.current.defaultValue);
	}, [innerInput.current]);

	const reachedMaxIntDigits = (value: string): boolean => {
		const newInt: number = parseInt(value);
		return Math.abs(newInt).toString().length > maxIntDigits ? true : false;
	};

	const handleKeyDown = (e: any): void => {
		// managing e.ctrlKey we allow to use the key combinations Ctrl+C, Ctrl+V, Ctrl+X
		if (!(e.ctrlKey === true)) {
			// avoid entering the number 'E'
			e.key.toLowerCase() === 'e' && e.preventDefault();
			!validKeys.includes(e.key) && e.preventDefault();
			e.key === '.' && !decimalPlaces && e.preventDefault();
		}
	};

	const valueLengthValid = (value: string): boolean => {
		// if maxLength specified, returns false when the length of the input is greater than maxLength
		if (value.length > maxLength) {
			return false;
		}
		return true;
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
		let newEvent = { ...e };
		// the value is processed only when is a valid value
		if (e.target.value !== '' && e.target.value !== '-') {
			decimalPlaces
				? // if decimalPlaces => newEvent.target.value = adaptValueToFormat(value, decimalPlaces)
				  (newEvent.target.value =
						e.target.value &&
						adaptValueToFormat(newEvent.target.value, decimalPlaces))
				: // if !decimalPlaces => newEvent.target.value = parseInt(value)
				  (newEvent.target.value =
						e.target.value && parseInt(newEvent.target.value, 10).toString());
		}
		// if the new value.length is greater than the maxLength
		!valueLengthValid(newEvent.target.value) &&
			(newEvent.target.value = prevValue);

		reachedMaxIntDigits(newEvent.target.value)
			? // if the value of integers === maxIntDigits => newEvent.target.value = prevValue
			  (newEvent.target.value = prevValue)
			: // if the value of integers < maxIntDigits => setPrevValue(e.target.value)
			  setPrevValue(newEvent.target.value);
		// call input.onChange with the new value
		input.onChange(newEvent.target.value);
		// return the new value in the callback
		callback && callback(newEvent);
	};

	const handleBlur = (e: any): void => {
		const newValue = fixToDecimals(e.target.value, decimalPlaces);
		if (e.target.value) e.target.value = newValue;
		input.onChange(e.target.value);
		input.onBlur(e.target.value); // without this call, validate won't be executed even if specified
	};

	const helper = new AccessibilityHelper(name, !!label, !!hint);

	return (
		<StyledInputLabel
			isError={meta && meta.touched && meta.error}
			cfg={Object.assign({ flexDirection: 'column', mt: 1 }, cfg)}
			noLeftBorder={noLeftBorder}
			element={wrapperElement}
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
				type="number"
				width={width}
				testId={testId}
				label={label}
				isError={meta && meta.touched && meta.error}
				placeholder={placeholder}
				readOnly={readOnly}
				required={required}
				decimalPlaces={decimalPlaces}
				{...input}
				onKeyDown={handleKeyDown}
				onChange={handleOnChange}
				onBlur={handleBlur}
				after={after}
				before={before}
				ariaLabelExtension={i18n.ariaLabelExtension}
				accessibilityHelper={helper}
				parentRef={innerInput}
				{...props}
			/>
		</StyledInputLabel>
	);
};

export interface FFInputNumberProps extends FieldWithAriaLabelExtensionProps {
	wrapperElement?: 'label' | 'div' | 'fieldset';
}

export const FFInputNumber: React.FC<FFInputNumberProps> = (fieldProps) => {
	return (
		<Field
			{...fieldProps}
			render={(props) => (
				<InputNumber
					{...props}
					name={fieldProps.name}
					initialValue={fieldProps.initialValue}
				/>
			)}
		/>
	);
};
