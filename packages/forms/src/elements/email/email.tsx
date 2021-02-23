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
import AccessibilityHelper from '../accessibilityHelper';

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
	const helper = new AccessibilityHelper(name, !!label, !!hint);

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
				accessibilityHelper={helper}
			/>
			<Input
				type="email"
				width={width}
				testId={testId}
				label={label}
				required={required}
				placeholder={placeholder}
				readOnly={readOnly}
				isError={meta && meta.touched && meta.error}
				accessibilityHelper={helper}
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
