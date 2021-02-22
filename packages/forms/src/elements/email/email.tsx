import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import {
	StyledInputLabel,
	InputElementHeading,
	getElementDescriptors,
	InputElementDescriptorProps,
} from '../elements';
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
	const descriptors: InputElementDescriptorProps = getElementDescriptors(
		name,
		!!label,
		!!hint,
	);

	return (
		<StyledInputLabel
			isError={meta && meta.touched && meta.error}
			cfg={Object.assign({ flexDirection: 'column', mt: 1 }, cfg)}
		>
			<InputElementHeading
				labelId={descriptors && descriptors.labelId}
				hintId={descriptors && descriptors.hintId}
				errorId={descriptors && descriptors.errorId}
				label={label}
				required={required}
				hint={hint}
				meta={meta}
			/>
			<Input
				type="email"
				width={width}
				hintId={descriptors && descriptors.hintId}
				errorId={descriptors && descriptors.errorId}
				testId={testId}
				label={label}
				required={required}
				placeholder={placeholder}
				readOnly={readOnly}
				isError={meta && meta.touched && meta.error}
				{...input}
			/>
		</StyledInputLabel>
	);
};

export const FFInputEmail: React.FC<
	FieldProps & FieldExtraProps
> = React.forwardRef((fieldProps, ref) => {
	return (
		<Field
			{...fieldProps}
			validate={composeValidators(
				executeClientValidation(fieldProps.validate),
				isEmailValid(
					fieldProps.error ? fieldProps.error : 'Invalid email address',
				),
			)}
			render={(props) => <InputEmail {...props} {...fieldProps} ref={ref} />}
		/>
	);
});
