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
	checked?: any;
	onChange: (props: any) => void;
	disabled?: boolean;
	align?: string;
	testId?: string;
	id?: string;
	label: string;
	value?: any;
};

export const Checkbox: React.FC<CheckboxIconProps> = props => {
	return (
		<ElementPlaceholder>
			<StyledLabel alignItems="center">
				<StyledCheckboxWrapper
					disabled={props.disabled || false}
					align={props.align || 'center'}
					data-testid={
						props.testId
							? `${props.testId}-${props.checked ? 'checked' : 'unchecked'}`
							: null
					}
					data-cy={
						props.testId
							? `${props.testId}-${props.checked ? 'checked' : 'unchecked'}`
							: null
					}
				>
					{props.checked ? <CheckboxChecked /> : <CheckboxBlank />}
					<StyledHiddenInput
						type="checkbox"
						id={props.id}
						checked={props.checked}
						value={props.value}
						disabled={props.disabled || false}
						onChange={props.onChange}
					/>
					{props.children}
				</StyledCheckboxWrapper>
				<Flex ml={0}>{props.label}</Flex>
			</StyledLabel>
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
			render={({ label, input, ...rest }: FFRenderCheckboxProps) => {
				return (
					<Checkbox
						value={input.value}
						checked={input.value}
						label={label}
						onChange={() => input.onChange(!input.value)}
						{...rest}
					/>
				);
			}}
		/>
	);
};
