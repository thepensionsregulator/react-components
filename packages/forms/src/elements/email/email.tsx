import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldExtraProps } from '../../renderFields';
import { FFInputCommonProps } from 'types/fieldProps';
import { Input } from '../input/input';
import { isEmailValid } from '../../validators';
import AccessibilityHelper from '../accessibilityHelper';

interface InputEmailProps extends FieldRenderProps<string>, FieldExtraProps {}

const InputEmail: React.FC<InputEmailProps> = ({
	hint,
	id,
	input,
	inputWidth: width,
	label,
	meta,
	name,
	placeholder,
	readOnly,
	required,
	testId,
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
				id={id}
				type="email"
				autoComplete="email"
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

export const FFInputEmail: React.FC<FFInputCommonProps> = React.forwardRef(
	(fieldProps, ref) => {
		return (
			<Field
				{...fieldProps}
				validate={isEmailValid(
					fieldProps.errorEmptyValue,
					fieldProps.errorInvalidValue,
					fieldProps.required,
				)}
				render={(props) => <InputEmail {...props} {...fieldProps} ref={ref} />}
			/>
		);
	},
);
