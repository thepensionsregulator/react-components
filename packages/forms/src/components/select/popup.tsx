import React from 'react';
import { PopupButton } from './styles';

export default function PopupBox({
	getItemProps,
	// inputValue,
	options,
	highlightedIndex,
	selectedItem,
	// openModal,
	handleNotFoundButtonClick,
	notFoundMessage,
	optionPreview,
}: any) {
	return (
		<>
			{!options.length ? (
				<PopupButton
					isClickable={typeof handleNotFoundButtonClick === 'function'}
					onClick={handleNotFoundButtonClick}
					children={notFoundMessage}
				/>
			) : (
				options.map((item, index) => (
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
