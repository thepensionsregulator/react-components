import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { P } from '@tpr/core';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { CheckboxChecked, CheckboxBlank } from './icons';
import { StyledInputLabel } from '../elements';
import { HiddenInput } from '../hidden/hidden';
import styles from './checkbox.module.scss';

type CheckboxIconProps = FieldRenderProps<string> & FieldExtraProps;
export const Checkbox: React.FC<Partial<CheckboxIconProps>> = ({
	id,
	cfg,
	disabled = false,
	testId,
	checked,
	onChange,
	label,
	hint,
	className,
}) => {
	const msg = testId ? `${testId}-${checked ? 'checked' : 'unchecked'}` : null;
	return (
		<StyledInputLabel
			element="div"
			className={className}
			cfg={Object.assign(
				{
					mt: 1,
					mb: 1,
					alignItems: 'flex-start',
					flexDirection: 'column',
				},
				cfg,
			)}
		>
			<label data-testid={msg} className={styles.wrapper} htmlFor={id}>
				<HiddenInput
					id={id}
					type="checkbox"
					aria-describedby={id && `${id}-hint`}
					checked={checked}
					disabled={disabled}
					onChange={onChange}
				/>
				{checked ? (
					<CheckboxChecked className={styles.checkbox} />
				) : (
					<CheckboxBlank className={styles.checkbox} />
				)}
				<P cfg={{ ml: 3, fontWeight: 3 }}>{label}</P>
			</label>
			{hint && (
				<P id={id && `${id}-hint`} className={styles.hint}>
					{hint}
				</P>
			)}
		</StyledInputLabel>
	);
};

export interface CheckboxProps extends FieldProps {
	callback?: Function;
}

export const FFCheckbox: React.FC<CheckboxProps> = (fieldProps) => {
	const handleChange = (input: any, value: boolean) => {
		input.onChange(!input.checked);
		fieldProps.callback && fieldProps.callback(value);
	};

	return (
		<Field
			{...fieldProps}
			type="checkbox"
			render={({ label, input, ...rest }: any) => {
				return (
					<Checkbox
						label={label}
						checked={input.checked}
						onChange={(e: any) => handleChange(input, e.target.checked)}
						{...rest}
					/>
				);
			}}
		/>
	);
};
