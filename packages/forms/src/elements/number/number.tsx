import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { Input } from '../input/input';

type InputNumberProps = FieldRenderProps<number> & FieldExtraProps;
const InputNumber: React.FC<InputNumberProps> = ({
	label,
	hint,
	input,
	testId,
	meta,
	required,
	inputWidth: width,
	cfg,
	...props
}) => {
	return (
		<StyledInputLabel
			isError={meta && meta.touched && meta.error}
			cfg={Object.assign({ flexDirection: 'column', mt: 1 }, cfg)}
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
				{...input}
				{...props}
			/>
		</StyledInputLabel>
	);
};

export const FFInputNumber: React.FC<FieldProps> = (fieldProps) => {
	return <Field {...fieldProps} component={InputNumber} />;
};
