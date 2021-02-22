import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading, getElementDescriptors, InputElementDescriptorProps } from '../elements';
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
	name,
	hint,
	input,
	testId,
	meta,
	required,
	placeholder,
	readOnly,
	inputWidth: width,
	cfg,
}) => {
	const descriptors: InputElementDescriptorProps = getElementDescriptors(name, !!label, !!hint);

	return (
		<StyledInputLabel
			isError={meta && meta.touched && meta.error}
			cfg={Object.assign({ flexDirection: 'column', mt: 1 }, cfg)}
		>
			<InputElementHeading
				label={label}
				labelId={descriptors && descriptors.labelId}
				hintId={descriptors && descriptors.hintId}
				errorId={descriptors && descriptors.errorId}
				required={required}
				hint={hint}
				meta={meta}
			/>
			<Input
				type="tel"
				width={width}
				testId={testId}
				label={label}
				hintId={descriptors && descriptors.hintId}
				errorId={descriptors && descriptors.errorId}
				placeholder={placeholder}
				readOnly={readOnly}
				isError={meta && meta.touched && meta.error}
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
				isPhoneValid(
					fieldProps.error ? fieldProps.error : 'Invalid phone number',
				),
			)}
			render={(props) => <InputPhone {...props} {...fieldProps} />}
		/>
	);
};
