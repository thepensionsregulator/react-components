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
	cfg,
	disabled = false,
	testId,
	checked,
	onChange,
	label,
	hint,
}) => {
	const msg = testId ? `${testId}-${checked ? 'checked' : 'unchecked'}` : null;
	return (
		<StyledInputLabel
			element="div"
			cfg={Object.assign(
				{
					mt: 1,
					mb: 3,
					alignItems: 'flex-start',
					flexDirection: 'column',
				},
				cfg,
			)}
		>
			<label data-testid={msg} className={styles.wrapper}>
				<HiddenInput
					type="checkbox"
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
			{hint && <P className={styles.hint}>{hint}</P>}
		</StyledInputLabel>
	);
};

export const FFCheckbox: React.FC<FieldProps> = (fieldProps) => {
	return (
		<Field
			{...fieldProps}
			type="checkbox"
			render={({ label, input, ...rest }: any) => {
				return (
					<Checkbox
						label={label}
						checked={input.checked}
						onChange={() => input.onChange(!input.checked)}
						{...rest}
					/>
				);
			}}
		/>
	);
};
