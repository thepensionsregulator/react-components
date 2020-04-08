import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { StyledInput } from '../text/styles';
import { FieldProps } from '../../utils/validation';

export const InputNumber: React.FC<FieldRenderProps<string> & FieldProps> = ({
	label,
	hint,
	required,
	input,
	testId,
	meta,
	...props
}) => {
	return (
		<StyledInputLabel
			isError={meta && meta.touched && meta.error}
			flexDirection="column"
		>
			<InputElementHeading
				label={label}
				required={required}
				hint={hint}
				meta={meta}
			/>
			<StyledInput
				aria-label={label}
				data-testid={testId}
				meta={meta}
				{...input}
				{...props}
				{...input}
				onChange={(evt: any) => input.onChange(parseInt(evt.target.value))}
				type="number"
			/>
		</StyledInputLabel>
	);
};

export const FFInputNumber: React.FC<FieldProps> = fieldProps => {
	return <Field {...fieldProps} component={InputNumber} />;
};
