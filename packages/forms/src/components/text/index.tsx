import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { StyledInput } from './styles';
import { FieldProps } from '../../utils/validation';

export { StyledInput };

export const InputText: React.FC<FieldRenderProps<string> & FieldProps> = ({
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
			mt={0}
		>
			<InputElementHeading
				label={label}
				required={required}
				hint={hint}
				meta={meta}
			/>
			<StyledInput
				data-testid={testId}
				aria-label={label}
				meta={meta}
				{...input}
				{...props}
			/>
		</StyledInputLabel>
	);
};

export const FFInputText: React.FC<FieldProps> = fieldProps => {
	return <Field {...fieldProps} component={InputText} />;
};
