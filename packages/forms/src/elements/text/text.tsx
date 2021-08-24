import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { Input } from '../input/input';
import { useEffect } from 'react';
import AccessibilityHelper from '../accessibilityHelper';

type InputTextProps = FieldRenderProps<string> &
	FieldExtraProps & {
		updatedValue: string;
	};
const InputText: React.FC<InputTextProps> = React.forwardRef(
	(
		{
			id,
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
			autoComplete,
			inputWidth: width,
			cfg,
			updatedValue,
			maxLength,
			wrapperElement,
			labelElement,
			headingElement,
		},
		ref,
	) => {
		useEffect(() => {
			if (typeof updatedValue !== 'undefined') {
				input.onChange(updatedValue);
			}
		}, [updatedValue]);

		const helper = new AccessibilityHelper(name, !!label, !!hint);
		const labelRequiresForAttribute =
			labelElement && labelElement.toUpperCase() === 'LABEL';
		if (labelRequiresForAttribute && !id) {
			throw 'id is required when setting labelElement="label"';
		}
		const InputElementHeadingWrapper = headingElement
			? headingElement
			: React.Fragment;

		return (
			<StyledInputLabel
				isError={meta && meta.touched && meta.error}
				element={wrapperElement}
				cfg={Object.assign({ flexDirection: 'column', mt: 1 }, cfg)}
			>
				<InputElementHeadingWrapper>
					<InputElementHeading
						element={labelElement}
						label={label}
						required={required}
						hint={hint}
						meta={meta}
						accessibilityHelper={helper}
						forId={labelRequiresForAttribute ? id : undefined}
					/>
				</InputElementHeadingWrapper>
				<Input
					id={id}
					parentRef={ref}
					type="text"
					width={width}
					testId={testId}
					label={ariaLabel ? ariaLabel : label}
					placeholder={placeholder}
					disabled={disabled}
					readOnly={readOnly}
					autoComplete={autoComplete}
					isError={meta && meta.touched && meta.error}
					className={inputClassName}
					maxLength={maxLength}
					accessibilityHelper={helper}
					required={required}
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
				required={fieldProps.required}
				render={(props) => <InputText {...props} {...fieldProps} ref={ref} />}
			/>
		);
	},
);
