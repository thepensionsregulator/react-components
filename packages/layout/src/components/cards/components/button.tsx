import React, { useEffect, useRef, MutableRefObject } from 'react';
import { Flex, H3, H4 } from '@tpr/core';
import styles from './button.module.scss';
import { EditArrowUp, EditArrowDown } from './arrowButton';
import { ArrowDown, ArrowUp } from '@tpr/icons';

interface UnderlinedButtonProps {
	isOpen?: boolean;
	onClick?: any;
	tabIndex?: number;
	isEditButton?: boolean;
	onCollapseCallback?: () => void;
	btnRef?: MutableRefObject<any>;
	isMainHeading?: boolean;
}

/*
	In all cards, we have 2 sections: Toolbar (containing at least the 'Remove' button) & Content (changes depending on the data being edited).
	Because the 'content' section changes, when clicking one of its buttons (on the Preview 'view') the focus needs to be added to the button rendered in the new view in the editing section.
	And when collapsing the editing section, the focus needs to return to the button that was clicked in the 'Preview' view.

	To solve this, 2 new properties need to be passed to the Underlinedbutton component.

	btnRef: reference received for buttons from the 'Preview' view, but only for those which are part of the 'content' section (not the Toolbar buttons).

	onCollapseCallback: callback function to be called when collapsing an editing section. This function is used to return the focus to the button from 'Preview'.
	*/

export const UnderlinedButton: React.FC<UnderlinedButtonProps> = ({
	children,
	isOpen,
	onClick,
	tabIndex,
	isEditButton,
	onCollapseCallback,
	btnRef,
	isMainHeading = false,
}) => {
	if (typeof onClick === 'undefined') {
		return (
			<div className={styles.buttonPlaceholder}>
				<Flex cfg={{ flex: '0 0 auto', alignItems: 'center' }}>
					{isMainHeading ? (
						<H3 cfg={{ fontWeight: 3 }}>{children}</H3>
					) : (
						<H4>{children}</H4>
					)}
				</Flex>
			</div>
		);
	}

	const noToolbarBtnRef = useRef(null);
	useEffect(() => {
		isOpen && noToolbarBtnRef && noToolbarBtnRef.current.focus();
		!isOpen && onCollapseCallback && onCollapseCallback();
	}, [isOpen]);
	const getAppropriateButton = () => {
		if (isOpen && isEditButton) {
			return <EditArrowUp width="24px" fill={styles.arrowColor} />;
		} else if (isOpen && !isEditButton) {
			return <ArrowUp width="24px" fill={styles.arrowColor} />;
		}

		if (!isOpen && isEditButton) {
			return <EditArrowDown width="24px" fill={styles.arrowColor} />;
		} else if (!isOpen && !isEditButton) {
			return <ArrowDown width="24px" fill={styles.arrowColor} />;
		}
	};

	return (
		<button
			className={styles.button}
			onClick={onClick}
			aria-expanded={isOpen}
			tabIndex={tabIndex}
			ref={btnRef ? btnRef : noToolbarBtnRef}
		>
			<Flex
				className={styles.arrowSpacing}
				cfg={{ flex: '0 0 auto', alignItems: 'center' }}
			>
				{isMainHeading ? (
					<H3 cfg={{ fontWeight: 3 }}>{children}</H3>
				) : (
					<H4>{children}</H4>
				)}
				{getAppropriateButton()}
			</Flex>
		</button>
	);
};
