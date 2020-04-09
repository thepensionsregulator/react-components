import React from 'react';
import Downshift, { DownshiftProps } from 'downshift';
import { UnfoldMore } from '@tpr/icons';
import { Field } from 'react-final-form';
import { Flex, StyledInputLabel, InputElementHeading } from '../elements';
import {
	StyledSelectInput,
	Popup,
	InputWrapper,
	IconPlacement,
} from './styles';
import { FieldProps } from '../../utils/validation';
import PopupBox from './popup';

interface SelectProps extends DownshiftProps<any> {
	options?: any;
	label?: string;
	placeholder?: string;
	onBlur?: Function;
	meta?: any;
	disabled?: boolean;
	handleNotFoundButtonClick?: Function;
	notFoundMessage?: string;
	required?: boolean;
	hint?: string;
	searchable?: boolean;
	testId?: string;
}

export const Select: React.FC<SelectProps> = ({
	options,
	label,
	required,
	hint,
	meta,
	handleNotFoundButtonClick,
	notFoundMessage = 'Your search criteria has no match',
	itemToString,
	initialSelectedItem,
	onChange,
	disabled,
	searchable,
	testId,
	placeholder,
	...rest
}) => {
	return (
		<Downshift
			onChange={onChange}
			itemToString={itemToString}
			initialSelectedItem={initialSelectedItem}
			{...rest}
		>
			{({
				getInputProps,
				getItemProps,
				getLabelProps,
				getMenuProps,
				isOpen,
				highlightedIndex,
				selectedItem,
				getRootProps,
				toggleMenu,
				inputValue,
			}) => (
				<Flex
					flexDirection="column"
					{...getRootProps({ refKey: null }, { suppressRefError: true })}
				>
					<StyledInputLabel
						isError={meta && meta.touched && meta.error}
						flexDirection="column"
						{...getLabelProps()}
					>
						<InputElementHeading
							label={label}
							required={required}
							hint={hint}
							meta={meta}
						/>
						<InputWrapper>
							<StyledSelectInput
								autoComplete="off"
								data-testid={testId}
								disabled={disabled}
								placeholder={placeholder}
								onClick={() => toggleMenu()}
								{...getInputProps()}
							/>
							<IconPlacement>
								<UnfoldMore />
							</IconPlacement>
						</InputWrapper>
					</StyledInputLabel>
					<div style={{ position: 'relative' }}>
						<Popup
							isOpen={isOpen}
							{...getMenuProps({
								width: 200,
								style: { padding: 0 },
							})}
						>
							{isOpen && (
								<PopupBox
									{...{
										searchable,
										getItemProps,
										inputValue,
										options,
										highlightedIndex,
										selectedItem,
										handleNotFoundButtonClick,
										notFoundMessage,
									}}
								/>
							)}
						</Popup>
					</div>
				</Flex>
			)}
		</Downshift>
	);
};

interface FFSelectProps extends FieldProps {}
export const FFSelect: React.FC<FFSelectProps> = field => {
	return (
		<Field
			{...field}
			render={({
				label,
				input,
				meta,
				hint,
				required,
				options,
				onChange,
				...props
			}) => {
				return (
					<Select
						initialSelectedItem={input.value}
						itemToString={item => (item ? item.label : '')}
						required={required}
						hint={hint}
						onChange={value => {
							// override onChange from outside if needed
							if (onChange && typeof onChange === 'function') {
								return onChange(value, input.onChange);
							}
							// otherwise forward
							return input.onChange(value);
						}}
						// onBlur={input.onBlur}
						options={options}
						meta={meta}
						label={label}
						aria-label={label}
						{...props}
					/>
				);
			}}
		/>
	);
};
