import React, { ChangeEvent, useState } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { Input } from '../input/input';
import { validKeys, parseToDecimals, fixToDecimals } from '../helpers';

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

	const reachedMaxIntDigits = (value:string): boolean => {
		const newInt:number = parseInt(value);
		return Math.abs(newInt).toString().length > maxIntDigits ? true : false;
	};

	const handleKeyDown = (e: any): void => {
		e.target.value.length >= maxLength &&
			!validKeys.includes(e.key) &&
			e.preventDefault();
		e.key.toLowerCase() === 'e' && e.preventDefault();
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
		decimalPlaces
			? input.onChange(
					e.target.value && parseToDecimals(e.target.value, decimalPlaces),
			  )
			: input.onChange(e.target.value && parseInt(e.target.value, 10));
		reachedMaxIntDigits(e.target.value)
			? input.onChange(prevValue)
			: setPrevValue(e.target.value);
		callback && callback(e);
	};

	const handleBlur = (e: any): void => {
		input.onBlur(e); // without this call, validate won't be executed even if specified
		const newValue = fixToDecimals(e.target.value, decimalPlaces);
		e.target.value = e.target.value ? newValue : null;
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
