import React, { ChangeEvent } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { Input } from '../input/input';
import { parseToDecimals, handleBlur } from '../helpers';

interface InputNumberProps extends FieldRenderProps<number>, FieldExtraProps {
	after?: any;
	callback?: (e: any) => void;
	decimalPlaces?: number;
	noLeftBorder?: boolean;
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
	callback,
	decimalPlaces,
	noLeftBorder,
	...props
}) => {
	return (
		<StyledInputLabel
			isError={meta && meta.touched && meta.error}
			cfg={Object.assign({ flexDirection: 'column', mt: 1 }, cfg)}
			noLeftBorder={noLeftBorder}
		>
			<InputElementHeading
				label={label}
				required={required}
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
				onChange={(evt: ChangeEvent<HTMLInputElement>) => {
					decimalPlaces
						? input.onChange(
								evt.target.value &&
									parseToDecimals(evt.target.value, decimalPlaces),
						  )
						: input.onChange(
								evt.target.value && parseInt(evt.target.value, 10),
						  );
					callback && callback(evt);
				}}
				onBlur={(e: any) => {
					input.onBlur(e); // without this call, validate won't be executed even if specified
					e.target.value = e.target.value
						? handleBlur(e.target.value, decimalPlaces)
						: null;
				}}
				after={after}
				{...props}
			/>
		</StyledInputLabel>
	);
};

export const FFInputNumber: React.FC<FieldProps> = (fieldProps) => {
	return <Field {...fieldProps} component={InputNumber} />;
};
