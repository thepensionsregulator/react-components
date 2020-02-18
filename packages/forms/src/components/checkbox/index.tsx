import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import {
	StyledLabel,
	StyledHiddenInput,
	ElementPlaceholder,
} from '../elements';
import { FieldProps } from '../../utils/validation';
import { StyledCheckboxWrapper } from './styles';
import { CheckboxChecked, CheckboxBlank } from '@tpr/icons';
import { Flex } from '@tpr/core';

type CheckboxIconProps = {
	checked: 'checked' | 'unchecked';
	onChange: (props: any) => void;
	disabled?: boolean;
	align?: string;
	dataCy?: string;
	id?: string;
};

export const CheckboxIcon: React.FC<CheckboxIconProps> = props => {
	return (
		<StyledLabel alignItems="center">
			<StyledCheckboxWrapper
				disabled={props.disabled || false}
				align={props.align || 'center'}
				data-cy={
					props.dataCy
						? `${props.dataCy}-${props.checked ? 'checked' : 'unchecked'}`
						: null
				}
			>
				{props.checked ? <CheckboxChecked /> : <CheckboxBlank />}
				<StyledHiddenInput
					type="checkbox"
					id={props.id}
					checked={props.checked}
					disabled={props.disabled || false}
					onChange={props.onChange}
					data-cy={props.dataCy}
				/>
				{props.children}
			</StyledCheckboxWrapper>
		</StyledLabel>
	);
};

export const Checkbox = ({ checked, onChange, label }) => {
	return (
		<ElementPlaceholder onClick={onChange}>
			<CheckboxIcon checked={checked} onChange={() => {}} />
			<Flex ml={0}>{label}</Flex>
		</ElementPlaceholder>
	);
};

type FFRenderCheckboxProps = Partial<
	FieldRenderProps<string> & FieldProps & CheckboxIconProps
>;
export const FFCheckbox: React.FC<FieldProps> = fieldProps => {
	return (
		<Field
			{...fieldProps}
			render={({ label, input, onChange }: FFRenderCheckboxProps) => {
				return (
					<Checkbox
						checked={input.value}
						label={label}
						onChange={() =>
							typeof onChange === 'function'
								? onChange(input)
								: input.onChange(!input.value)
						}
					/>
				);
			}}
		/>
	);
};
