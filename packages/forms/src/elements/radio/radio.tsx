import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { P } from '@tpr/core';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { RadioButtonChecked, RadioButtonUnchecked } from './icons';
import { StyledInputLabel } from '../elements';
import { HiddenInput } from '../hidden/hidden';
import styles from './radio.module.scss';
import AccessibilityHelper from '../accessibilityHelper';

type RadioButtonProps = FieldRenderProps<string> & FieldExtraProps;
export const RadioButton: React.FC<RadioButtonProps> = ({
	id,
	cfg,
	disabled = false,
	testId,
	name,
	checked,
	onChange,
	label,
	value,
	hint,
	className,
}) => {
	const msg = testId ? `${testId}-${checked ? 'checked' : 'unchecked'}` : null;
	const helper = new AccessibilityHelper(
		id ? id : `${name}_${value}`,
		!!label,
		!!hint,
	);
	return (
		<StyledInputLabel
			element="div"
			className={className}
			cfg={Object.assign(
				{
					mt: 1,
					mb: 1,
					py: 1,
					alignItems: 'flex-start',
					flexDirection: 'column',
				},
				cfg,
			)}
		>
			<label
				id={helper && helper.labelId}
				className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}
				data-testid={msg}
				htmlFor={id}
			>
				<HiddenInput
					type="radio"
					id={id}
					aria-describedby={helper && helper.hintId}
					name={name}
					checked={checked}
					value={value}
					disabled={disabled}
					onChange={onChange}
					data-testid={testId}
				/>
				{checked ? (
					<RadioButtonChecked className={styles.radio} />
				) : (
					<RadioButtonUnchecked className={styles.radio} />
				)}
				<P cfg={{ ml: 2, fontWeight: 3 }} className={styles.label}>
					{label}
				</P>
			</label>
			{hint && (
				<P id={helper && helper.hintId} className={styles.hint}>
					{hint}
				</P>
			)}
		</StyledInputLabel>
	);
};

export const FFRadioButton: React.FC<FieldProps> = (fieldProps) => {
	const handleChange = (input: any, value: any) => {
		input.onChange(value);
		fieldProps.callback && fieldProps.callback(value);
	};

	return (
		<Field
			{...fieldProps}
			type="radio"
			render={({ label, input, ...rest }: any) => {
				return (
					<RadioButton
						name={input.name}
						value={input.value}
						checked={input.checked}
						label={label}
						onChange={(e: any) => handleChange(input, e.target.value)}
						{...rest}
					/>
				);
			}}
		/>
	);
};
