import React from 'react';
import { Popup, PopupButton } from './styles';

const filteredOptions = [];

export default function({
	getMenuProps,
	getItemProps,
	// inputValue,
	// options,
	highlightedIndex,
	selectedItem,
	// openModal,
	handleNotFoundButtonClick,
	notFoundMessage,
	optionPreview,
}) {
	return (
		<Popup
			{...getMenuProps({
				width: 200,
				style: { padding: 0 },
			})}
		>
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
		</Popup>
	);
}
