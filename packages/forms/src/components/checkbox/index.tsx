import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledLabel } from '../elements';
import { FieldProps } from '../../utils/validation';
import { StyledCheckboxWrapper, StyledHiddenInput } from './styles';
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
				{props.checked === 'checked' ? <CheckboxChecked /> : <CheckboxBlank />}
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

type CheckboxProps = Partial<FieldRenderProps<string> & FieldProps>;

export const Checkbox: React.FC<CheckboxProps> = ({
	label,
	input,
	onChange,
}) => {
	console.log(input.value);
	return (
		<Flex width="300px" flex="0 0 auto" p={0} backgroundColor="#eee">
			<CheckboxIcon
				checked={input.value ? 'checked' : 'unchecked'}
				onChange={() =>
					typeof onChange === 'function'
						? onChange(input)
						: input.onChange(!input.value)
				}
			/>
			{label && <Flex ml={0}>{label}</Flex>}
		</Flex>
	);
};

export const FFCheckbox: React.FC<FieldProps> = fieldProps => {
	return <Field {...fieldProps} component={Checkbox} />;
};
