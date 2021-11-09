import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { classNames, P } from '@tpr/core';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { CheckboxChecked, CheckboxBlank } from './icons';
import { ErrorMessage, StyledInputLabel } from '../elements';
import { HiddenInput } from '../hidden/hidden';
import styles from './checkbox.module.scss';
import AccessibilityHelper from '../accessibilityHelper';

type CheckboxIconProps = FieldRenderProps<string> & FieldExtraProps;
export const Checkbox: React.FC<Partial<CheckboxIconProps>> = ({
	id,
	cfg,
	disabled = false,
	testId,
	checked,
	required,
	onChange,
	label,
	hint,
	meta,
	className,
	children,
}) => {
	const msg = testId ? `${testId}-${checked ? 'checked' : 'unchecked'}` : null;
	const helper = new AccessibilityHelper(id, !!label, !!hint);

	return (
		<StyledInputLabel
			element="div"
			className={classNames([className, styles.outerWrapper])}
			cfg={Object.assign(
				{
					mt: 1,
					mb: 4,
				},
				cfg,
			)}
			isError={meta && meta.error && meta.touched}
		>
			<label
				id={helper && helper.labelId}
				data-testid={msg}
				className={styles.wrapper}
				htmlFor={id}
			>
				{meta && meta.touched && meta.touched && (
					<ErrorMessage id={helper.errorId} role="alert">
						{meta.error}
					</ErrorMessage>
				)}
				<div className={styles.innerWrapper}>
					<HiddenInput
						id={id}
						type="checkbox"
						checked={checked}
						disabled={disabled}
						required={required}
						onChange={onChange}
					/>
					{checked ? (
						<CheckboxChecked className={styles.checkbox} />
					) : (
						<CheckboxBlank className={styles.checkbox} />
					)}
					<P cfg={{ fontWeight: 3 }} className={styles.label}>
						{label}
					</P>
				</div>
				{hint && (
					<P id={helper.hintId} className={styles.hint}>
						{hint}
					</P>
				)}
				{children && (
					<div id={helper.hintId} className={styles.hint}>
						{children}
					</div>
				)}
			</label>
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
