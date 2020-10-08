import React, { ChangeEvent } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { Input } from '../input/input';
import { parseToDecimals, fixToDecimals } from '../helpers';

interface InputNumberProps extends FieldRenderProps<number>, FieldExtraProps {
	after?: string;
	before?: string;
	callback?: (e: any) => void;
	decimalPlaces?: number;
	noLeftBorder?: boolean;
	optionalText?: boolean;
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
	...props
}) => {
	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		decimalPlaces
			? input.onChange(
					e.target.value && parseToDecimals(e.target.value, decimalPlaces),
			  )
			: input.onChange(e.target.value && parseInt(e.target.value, 10));
		callback && callback(e);
	};

	const handleBlur = (e: any) => {
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
				onKeyDown={(e) => e.key.toLowerCase() === 'e' && e.preventDefault()}
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
