import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { Input } from '../input/input';
import {
	composeValidators,
	isEmailValid,
	executeClientValidation,
} from '../../validators';

type InputEmailProps = FieldRenderProps<string> & FieldExtraProps;
const InputEmail: React.FC<InputEmailProps> = ({
	label,
	hint,
	input,
	testId,
	meta,
	required,
	placeholder,
	inputWidth: width,
	cfg,
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
				type="email"
				width={width}
				testId={testId}
				label={label}
				placeholder={placeholder}
				touched={meta && meta.touched && meta.error}
				{...input}
			/>
		</StyledInputLabel>
	);
};

export const FFInputEmail: React.FC<FieldProps & FieldExtraProps> = (
	fieldProps,
) => {
	return (
		<Field
			{...fieldProps}
			required={typeof fieldProps.validate === 'function' || fieldProps.error}
			validate={composeValidators(
				executeClientValidation(fieldProps.validate),
				isEmailValid('Invalid email address'),
			)}
			component={InputEmail}
		/>
	);
};
