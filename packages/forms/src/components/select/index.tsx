import React from 'react';
import Downshift from 'downshift';
import { Flex, StyledInputLabel, InputElementHeading } from '../elements';
import { StyledSelect, Menu, Item } from './styles';

const items = [
	{ value: 'apple' },
	{ value: 'pear' },
	{ value: 'orange' },
	{ value: 'grape' },
	{ value: 'banana' },
];

export const Select = () => {
	return (
		<Downshift
			onChange={console.log}
			itemToString={item => (item ? item.value : '')}
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
						<StyledSelect {...getInputProps()} />
					</StyledInputLabel>
					<Menu {...getMenuProps()}>
						{isOpen
							? items.map((item, index) => (
									<Item
										{...getItemProps({
											key: item.value,
											index,
											item,
											style: {
												backgroundColor:
													highlightedIndex === index ? 'lightgray' : 'white',
												fontWeight: selectedItem === item ? 'bold' : 'normal',
											},
										})}
									>
										{item.value}
									</Item>
							  ))
							: null}
					</Menu>
				</Flex>
			)}
		</Downshift>
	);
};
