import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { Input } from '../input/input';
import {
	composeValidators,
	isPhoneValid,
	executeClientValidation,
} from '../../validators';

type InputPhoneProps = FieldRenderProps<string> & FieldExtraProps;
const InputPhone: React.FC<InputPhoneProps> = ({
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
				type="tel"
				noValidate
				width={width}
				testId={testId}
				label={label}
				placeholder={placeholder}
				touched={meta && meta.touched && meta.error}
				required={required}
				{...input}
			/>
		</StyledInputLabel>
	);
};

export const FFInputPhone: React.FC<FieldProps & FieldExtraProps> = (
	fieldProps,
) => {
	return (
		<Field
			{...fieldProps}
			validate={composeValidators(
				executeClientValidation(fieldProps.validate),
				isPhoneValid('Invalid phone number'),
			)}
			component={InputPhone}
		/>
	);
};
