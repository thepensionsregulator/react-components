import React from 'react';
import { PopupButton } from './styles';
import getItems from './getItems';

export default function PopupBox({
	getItemProps,
	inputValue,
	options,
	highlightedIndex,
	selectedItem,
	handleNotFoundButtonClick,
	notFoundMessage,
	optionPreview,
	searchable = false,
}: any) {
	const filteredOptions = searchable ? getItems(options, inputValue) : options;

	return (
		<>
			{!filteredOptions.length ? (
				<PopupButton
					isClickable={typeof handleNotFoundButtonClick === 'function'}
					onClick={handleNotFoundButtonClick}
					children={notFoundMessage}
				/>
			) : (
				filteredOptions.map((item, index) => (
					<PopupButton
						{...getItemProps({
							key: index,
							index,
							item,
							isActive: highlightedIndex === index,
							isSelected: selectedItem && selectedItem.value === item.value,
						})}
					>
						{optionPreview ? optionPreview(item) : item.label}
					</PopupButton>
				))
			)}
		</>
	);
}
