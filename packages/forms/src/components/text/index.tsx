import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { StyledInput } from './styles';
import { FieldProps } from '../../utils/validation';

export const InputText: React.FC<FieldRenderProps<string> & FieldProps> = ({
	label,
	hint,
	required,
	input,
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
			<StyledInput aria-label={label} meta={meta} {...input} {...props} />
		</StyledInputLabel>
	);
};

export const FFInputText: React.FC<FieldProps> = fieldProps => {
	return <Field {...fieldProps} component={InputText} />;
};
