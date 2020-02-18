import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { ErrorMessage, FormLabelText, StyledLabel } from '../elements';
import { StyledInput } from './styles';
import { FieldProps } from '../../utils/validation';
import { Span } from '@tpr/core';

export const InputText: React.FC<FieldRenderProps<string> & FieldProps> = ({
	label,
	required,
	input,
	meta,
	...props
}) => {
	return (
		<StyledLabel flexDirection="column">
			{label && (
				<FormLabelText>
					{label} {!required && <Span>(optional)</Span>}
				</FormLabelText>
			)}
			<StyledInput aria-label={label} {...input} {...props} />
			{meta && meta.touched && meta.error && (
				<ErrorMessage>{meta.error}</ErrorMessage>
			)}
		</StyledLabel>
	);
};

export const FFInputText: React.FC<FieldProps> = fieldProps => {
	return <Field {...fieldProps} component={InputText} />;
};
