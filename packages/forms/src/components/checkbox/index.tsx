import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledLabel } from '../elements';
import { FieldProps } from '../../utils/validation';
import { StyledCheckboxWrapper, StyledHiddenInput } from './styles';
import { Flex } from '@tpr/core';

type CheckboxProps = {
	checked: 'checked' | 'unchecked';
	onChange: (props: any) => void;
	disabled?: boolean;
	align?: string;
	dataCy?: string;
	id?: string;
};

export const CheckboxIcon: React.FC<CheckboxProps> = props => {
	return (
		<StyledLabel>
			<StyledCheckboxWrapper
				disabled={props.disabled || false}
				align={props.align || 'center'}
				data-cy={
					props.dataCy
						? `${props.dataCy}-${props.checked ? 'checked' : 'unchecked'}`
						: null
				}
			>
				{props.checked ? (
					<div>checkbox checked</div>
				) : (
					<div>checkbox blank</div>
				)}
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

export const Checkbox: React.FC<FieldRenderProps<string> & FieldProps> = ({
	label,
	input,
	onChange,
}) => {
	return (
		<Flex p={0} backgroundColor="neutral.200">
			<CheckboxIcon
				checked={input.value ? 'checked' : 'unchecked'}
				onChange={() =>
					onChange ? onChange(input) : input.onChange(!input.value)
				}
			/>
			{label && <div>{label}</div>}
		</Flex>
	);
};

export const FFCheckbox: React.FC<FieldProps> = fieldProps => {
	return <Field {...fieldProps} component={Checkbox} />;
};
