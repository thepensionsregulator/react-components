import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldExtraProps } from '../../renderFields';
import { FFInputCommonProps } from 'types/fieldProps';
import { Input } from '../input/input';
import { isPhoneValid } from '../../validators';
import AccessibilityHelper from '../accessibilityHelper';

interface InputPhoneProps extends FieldRenderProps<string>, FieldExtraProps {}

const InputPhone: React.FC<InputPhoneProps> = ({
	id,
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
				id={id}
				type="tel"
				width={width}
				testId={testId}
				label={label}
				placeholder={placeholder}
				readOnly={readOnly}
				isError={meta && meta.touched && meta.error}
				required={required}
				accessibilityHelper={helper}
				{...input}
			/>
		</StyledInputLabel>
	);
};

export const FFInputPhone: React.FC<FFInputCommonProps> = (fieldProps) => {
	return (
		<Field
			{...fieldProps}
			validate={isPhoneValid(
				fieldProps.errorEmptyValue,
				fieldProps.errorInvalidValue,
				fieldProps.required,
			)}
			render={(props) => <InputPhone {...props} {...fieldProps} />}
		/>
	);
};
