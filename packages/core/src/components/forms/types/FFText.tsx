import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { Input, ErrorMessage, FormLabel, StyledLabel } from '../formElements';

type FFTextProps = {
	name: string;
	type: string;
	label?: string;
};

// incorrect typings... find out how to apply final-form types...

const InputText: React.FC<FieldRenderProps<string> & FFTextProps> = ({ label, input, meta, ...props }) => {
	return (
		<StyledLabel>
			{label && <FormLabel>{label}</FormLabel>}
			<Input {...input} {...props} aria-label={label} />
			{meta && meta.touched && meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
		</StyledLabel>
	);
};

export const FFText: React.FC<FFTextProps> = fieldProps => {
	return <Field {...fieldProps} component={InputText} />;
};
