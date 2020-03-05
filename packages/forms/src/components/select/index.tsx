import React from 'react';
import Downshift from 'downshift';
import { Field } from 'react-final-form';
import { Flex, StyledInputLabel, InputElementHeading } from '../elements';
import { StyledSelectInput, Popup } from './styles';
import { FieldProps } from '../../utils/validation';
import PopupBox from './popup';

interface SelectProps {
	options?: any;
	label?: string;
	placeholder?: string;
	onChange?: Function;
	onBlur?: Function;
	meta?: any;
	disabled?: boolean;
	itemToString?: (item: any) => any;
	handleNotFoundButtonClick?: Function;
	notFoundMessage?: string;
	initialSelectedItem?: string;
}

export const Select: React.FC<SelectProps> = ({
	options,
	label,
	placeholder = 'Please select...',
	meta,
	onBlur,
	disabled,
	handleNotFoundButtonClick,
	notFoundMessage = 'Your search criteria has no match',
	itemToString,
	initialSelectedItem,
}) => {
	return (
		<Downshift
			itemToString={itemToString}
			initialSelectedItem={initialSelectedItem}
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
						flexDirection="column"
						{...getLabelProps({ onClick: () => toggleMenu() })}
					>
						<InputElementHeading
							hint="For example apple or pear"
							label="Enter a fruit"
						/>
						<StyledSelectInput {...getInputProps()} />
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
					<StyledInputLabel
						isError={meta && meta.touched && meta.error}
						flexDirection="column"
					>
						<InputElementHeading
							label={label}
							required={required}
							hint={hint}
							meta={meta}
						/>
						<Select
							initialSelectedItem={input.value}
							itemToString={item => (item ? item.label : '')}
							onChange={value => {
								// override onChange from outside if needed
								if (onChange && typeof onChange === 'function') {
									return onChange(value, input.onChange);
								}
								// otherwise forward the value
								return input.onChange(value);
							}}
							// onBlur={input.onBlur}
							options={options}
							meta={meta}
							aria-label={label}
							{...props}
						/>
					</StyledInputLabel>
				);
			}}
		/>
	);
};
