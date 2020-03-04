import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import {
	StyledLabel,
	StyledHiddenInput,
	ElementPlaceholder,
	Flex,
} from '../elements';
import { FieldProps } from '../../utils/validation';
import { StyledRadioWrapper } from './styles';
import { RadioButtonChecked, RadioButtonUnchecked } from '@tpr/icons';

type RadioButtonProps = {
	checked: any;
	onChange: (props: any) => void;
	disabled?: boolean;
	align?: string;
	testId?: string;
	id?: string;
	value?: any;
	name?: string;
	label: string;
};

export const RadioButton: React.FC<RadioButtonProps> = props => {
	return (
		<ElementPlaceholder>
			<StyledLabel alignItems="center">
				<StyledRadioWrapper
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
					{props.checked ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
					<StyledHiddenInput
						type="radio"
						id={props.id}
						name={props.name}
						checked={props.checked}
						value={props.value}
						disabled={props.disabled || false}
						onChange={props.onChange}
						data-cy={props.testId}
						data-testid={props.testId}
					/>
					{props.children}
				</StyledRadioWrapper>
				<Flex ml={0}>{props.label}</Flex>
			</StyledLabel>
		</ElementPlaceholder>
	);
};

type FFRenderRadioButtonProps = Partial<
	FieldRenderProps<string> & FieldProps & RadioButtonProps
>;
export const FFRadioButton: React.FC<FieldProps> = fieldProps => {
	return (
		<Field
			{...fieldProps}
			render={({ label, input, ...rest }: FFRenderRadioButtonProps) => {
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
