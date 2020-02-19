import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { ErrorMessage, FormLabelText, StyledInputLabel } from '../elements';
import { StyledInput } from './styles';
import { FieldProps } from '../../utils/validation';
import { Span } from '@tpr/core';

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
			{label && (
				<FormLabelText m="0px">
					{label} {!required && '(optional)'}
				</FormLabelText>
			)}
			{hint && (
				<Span fontSize={1} my={0} color="neutral.300">
					{hint}
				</Span>
			)}
			{meta && meta.touched && meta.error && (
				<ErrorMessage>{meta.error}</ErrorMessage>
			)}
			<StyledInput aria-label={label} meta={meta} {...input} {...props} />
		</StyledInputLabel>
	);
};

export const FFInputText: React.FC<FieldProps> = fieldProps => {
	return <Field {...fieldProps} component={InputText} />;
};
