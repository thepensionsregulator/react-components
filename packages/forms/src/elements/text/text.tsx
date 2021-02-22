import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading, getElementDescriptors, InputElementDescriptorProps } from '../elements';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { Input } from '../input/input';
import { useEffect } from 'react';
import { id } from 'date-fns/locale';

type InputTextProps = FieldRenderProps<string> &
	FieldExtraProps & {
		updatedValue: string;
	};
const InputText: React.FC<InputTextProps> = React.forwardRef(
	(
		{
			label,
			name,
			ariaLabel,
			hint,
			input,
			inputClassName,
			testId,
			meta,
			required,
			placeholder,
			disabled,
			readOnly,
			inputWidth: width,
			cfg,
			updatedValue,
			maxLength,
		},
		ref,
	) => {
		useEffect(() => {
			if (typeof updatedValue !== 'undefined') {
				input.onChange(updatedValue);
			}
		}, [updatedValue]);

		const descriptors: InputElementDescriptorProps = getElementDescriptors(name, !!label, !!hint);

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
					parentRef={ref}
					type="text"
					width={width}
					testId={testId}
					errorId={descriptors && descriptors.errorId}
					label={ariaLabel ? ariaLabel : label}
					placeholder={placeholder}
					disabled={disabled}
					readOnly={readOnly}
					isError={meta && meta.touched && meta.error}
					className={inputClassName}
					maxLength={maxLength}
					{...input}
				/>
			</StyledInputLabel>
		);
	},
);

export const FFInputText: React.FC<FieldProps> = React.forwardRef(
	(fieldProps, ref) => {
		return (
			<Field
				{...fieldProps}
				required={typeof fieldProps.validate === 'function' || fieldProps.error}
				render={(props) => <InputText {...props} {...fieldProps} ref={ref} />}
			/>
		);
	},
);
