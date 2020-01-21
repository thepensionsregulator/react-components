import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInput, ErrorMessage, FormLabelText, StyledLabel } from './styles';
import { FieldProps } from '../helpers/validation';
import { Span } from '@tpr/core';

const InputText: React.FC<FieldRenderProps<string> & FieldProps> = ({ label, required, input, meta, ...props }) => {
	return (
		<StyledLabel>
			{label && (
				<FormLabelText>
					{label} {required && <Span color="danger.200">*</Span>}
				</FormLabelText>
			)}
			<StyledInput aria-label={label} {...input} {...props} />
			{meta && meta.touched && meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
		</StyledLabel>
	);
};

export const FFInputText: React.FC<FieldProps> = fieldProps => {
	return <Field {...fieldProps} component={InputText} />;
};
