import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { P } from '@tpr/core';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { RadioButtonChecked, RadioButtonUnchecked } from '@tpr/icons';
import { StyledInputLabel } from '../elements';
import { HiddenInput } from '../hidden/hidden';
import styles from './radio.module.scss';

type RadioButtonProps = FieldRenderProps<string> & FieldExtraProps;
export const RadioButton: React.FC<RadioButtonProps> = ({
	id,
	cfg,
	disabled = false,
	testId,
	checked,
	onChange,
	label,
	value,
	hint,
}) => {
	const msg = testId ? `${testId}-${checked ? 'checked' : 'unchecked'}` : null;
	return (
		<StyledInputLabel
			element="div"
			cfg={Object.assign(
				{ mt: 1, py: 1, alignItems: 'flex-start', flexDirection: 'column' },
				cfg,
			)}
		>
			<label className={styles.wrapper} data-testid={msg}>
				{checked ? (
					<RadioButtonChecked width="36px" />
				) : (
					<RadioButtonUnchecked width="36px" />
				)}
				<HiddenInput
					type="radio"
					id={id}
					name={name}
					checked={checked}
					value={value}
					disabled={disabled}
					onChange={onChange}
					data-testid={testId}
				/>
				<P className={styles.label}>{label}</P>
			</label>
			{hint && <P className={styles.hint}>{hint}</P>}
		</StyledInputLabel>
	);
};

export const FFRadioButton: React.FC<FieldProps> = (fieldProps) => {
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
						onChange={input.onChange}
						{...rest}
					/>
				);
			}}
		/>
	);
};
