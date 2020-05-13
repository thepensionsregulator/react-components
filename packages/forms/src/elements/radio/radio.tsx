import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { Flex } from '@tpr/core';
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
		<StyledInputLabel cfg={Object.assign({ mt: 1, py: 1 }, cfg)}>
			<Flex cfg={{ alignItems: 'flex-start' }}>
				<div className={styles.wrapper} data-testid={msg}>
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
				</div>
				<Flex cfg={{ ml: 1, flexDirection: 'column' }}>
					<Flex fontSize={2}>{label}</Flex>
					{hint && (
						<Flex color="neutral.300" fontSize={2}>
							{hint}
						</Flex>
					)}
				</Flex>
			</Flex>
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
