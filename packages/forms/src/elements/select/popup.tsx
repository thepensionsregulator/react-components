import React from 'react';
import getItems from './getItems';
import { classNames } from '@tpr/core';
import styles from './popup.module.scss';

type PopupBoxProps = any;
const PopupBox: React.FC<PopupBoxProps> = ({
	getItemProps,
	inputValue,
	options,
	highlightedIndex,
	selectedItem,
	handleNotFoundButtonClick,
	notFoundMessage,
	optionPreview,
	searchable = false,
}) => {
	const filteredOptions = searchable ? getItems(options, inputValue) : options;
	return (
		<>
			{!filteredOptions.length ? (
				<div
					role="button"
					className={styles.button}
					// isClickable={typeof handleNotFoundButtonClick === 'function'}
					onClick={handleNotFoundButtonClick}
					children={notFoundMessage}
				/>
			) : (
				filteredOptions.map((item, index) => (
					<div
						role="button"
						{...getItemProps({
							key: index,
							index,
							item,
							className: classNames([
								{ [styles.active]: highlightedIndex === index },
								{
									[styles.selected]:
										selectedItem && selectedItem.value === item.value,
								},
								styles.button,
							]),
						})}
					>
						{optionPreview ? optionPreview(item) : item.label}
					</div>
				))
			)}
		</>
	);
};

export default PopupBox;
