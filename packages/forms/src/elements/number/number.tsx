import React, { ChangeEvent, useState } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { Input } from '../input/input';
import { validKeys, adaptValueToFormat, fixToDecimals } from '../helpers';

interface InputNumberProps extends FieldRenderProps<number>, FieldExtraProps {
	after?: string;
	before?: string;
	callback?: (e: any) => void;
	decimalPlaces?: number;
	noLeftBorder?: boolean;
	optionalText?: boolean;
	maxLength?: number;
	maxIntDigits?: number;
}

const InputNumber: React.FC<InputNumberProps> = ({
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
	decimalPlaces,
	noLeftBorder,
	optionalText,
	maxLength,
	maxIntDigits,
	...props
}) => {
	const [prevValue, setPrevValue] = useState<string | null>(null);

	const reachedMaxIntDigits = (value: string): boolean => {
		const newInt: number = parseInt(value);
		return Math.abs(newInt).toString().length > maxIntDigits ? true : false;
	};

	const handleKeyDown = (e: any): void => {
		e.target.value.length >= maxLength &&
			!validKeys.includes(e.key) &&
			e.preventDefault();
		e.key.toLowerCase() === 'e' && e.preventDefault();
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
		let newEvent = { ...e };
		// if decimalPlaces && value not null => e.target.value = adaptValueToFormat(value, decimalPlaces)
		// if decimalPlaces && value is null => e.target.value = parseInt(value)
		decimalPlaces
			? (newEvent.target.value =
					e.target.value &&
					adaptValueToFormat(newEvent.target.value, decimalPlaces))
			: (newEvent.target.value =
					e.target.value && parseInt(newEvent.target.value, 10).toString());
		// if the value of integers === maxIntDigits => e.target.value = prevValue
		// if the value of integers < maxIntDigits => setPrevValue(e.target.value)
		reachedMaxIntDigits(newEvent.target.value)
			? (newEvent.target.value = prevValue)
			: setPrevValue(newEvent.target.value);
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
				type="number"
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

export const FFInputNumber: React.FC<FieldProps> = (fieldProps) => {
	return <Field {...fieldProps} component={InputNumber} />;
};
