import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { P } from '@tpr/core';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { CheckboxChecked, CheckboxBlank } from '@tpr/icons';
import { StyledInputLabel } from '../elements';
import { HiddenInput } from '../hidden/hidden';
import styles from './checkbox.module.scss';

type CheckboxIconProps = FieldRenderProps<string> & FieldExtraProps;
export const Checkbox: React.FC<CheckboxIconProps> = ({
	cfg,
	disabled = false,
	testId,
	checked,
	onChange,
	label,
}) => {
	const msg = testId ? `${testId}-${checked ? 'checked' : 'unchecked'}` : null;
	return (
		<StyledInputLabel cfg={Object.assign({ mt: 1, py: 1 }, cfg)}>
			<div
				data-testid={msg}
				className={styles.styledCheckboxWrapper}
				onClick={onChange}
			>
				{checked ? (
					<CheckboxChecked width="36px" />
				) : (
					<CheckboxBlank width="36px" />
				)}
				<HiddenInput
					type="checkbox"
					checked={checked}
					disabled={disabled}
					onChange={onChange}
				/>
				<P cfg={{ ml: 1 }}>{label}</P>
			</div>
		</StyledInputLabel>
	);
};

export const FFCheckbox: React.FC<FieldProps> = (fieldProps) => {
	return (
		<Field
			type="checkbox"
			{...fieldProps}
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
