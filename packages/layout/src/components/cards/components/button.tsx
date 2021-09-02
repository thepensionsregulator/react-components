import React, { useEffect, useRef, MutableRefObject } from 'react';
import { Flex, H3, H4, P } from '@tpr/core';
import { ArrowDown, ArrowUp } from '@tpr/icons';
import { EditArrowUp, EditArrowDown } from './arrowButton';
import styles from './button.module.scss';

interface UnderlinedButtonProps {
	isOpen?: boolean;
	onClick?: any;
	tabIndex?: number;
	isEditButton?: boolean;
	onCollapseCallback?: () => void;
	buttonRef?: MutableRefObject<any>;
	isMainHeading?: boolean;
	heading?: boolean;
}

/*
	In all cards, we have 2 sections: Toolbar (containing at least the 'Remove' button) & Content (changes depending on the data being edited).
	Because the 'content' section changes, when clicking one of its buttons (on the Preview 'view') the focus needs to be added to the button rendered in the new view in the editing section.
	And when collapsing the editing section, the focus needs to return to the button that was clicked in the 'Preview' view.

	To solve this, 2 new properties need to be passed to the Underlinedbutton component.

	buttonRef: reference received for buttons from the 'Preview' view.

	onCollapseCallback: callback function to be called when collapsing an editing section. This function is used to return the focus to the button from 'Preview'.
	*/

export const UnderlinedButton: React.FC<UnderlinedButtonProps> = ({
	children,
	isOpen,
	onClick,
	tabIndex,
	isEditButton,
	onCollapseCallback,
	buttonRef,
	isMainHeading = false,
	heading = true,
}) => {
	const editViewButtonRef = useRef(null);

	const Heading: React.FC = () => (
		<div className={styles.buttonPlaceholder}>
			<Flex cfg={{ flex: '0 0 auto', alignItems: 'center' }}>
				{isMainHeading ? (
					<H3 className={styles.heading3} data-testid="card-main-heading">
						{children}
					</H3>
				) : (
					<H4 className={styles.heading4} data-testid="card-heading">
						{children}
					</H4>
				)}
			</Flex>
		</div>
	);

	const ClickableButton: React.FC = () => (
		<button
			className={styles.button}
			onClick={onClick}
			aria-expanded={isOpen}
			tabIndex={tabIndex}
			ref={isOpen ? editViewButtonRef : buttonRef}
		>
			<Flex
				className={styles.arrowSpacing}
				cfg={{ flex: '0 0 auto', alignItems: 'center' }}
			>
				{children}
				{getAppropriateButton()}
			</Flex>
		</button>
	);

	const MainHeadingButton: React.FC = () => (
		<H3 className={styles.heading3} data-testid="card-main-heading-button">
			<ClickableButton />
		</H3>
	);

	const HeadingButton: React.FC = () => (
		<H4 className={styles.heading4} data-testid="card-heading-button">
			<ClickableButton />
		</H4>
	);

	const ParagraphButton: React.FC = () => (
		<P className={styles.heading4} data-testid="card-not-heading">
			<ClickableButton />
		</P>
	);

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

	useEffect(() => {
		isOpen && editViewButtonRef && editViewButtonRef.current.focus();
		!isOpen && onCollapseCallback && onCollapseCallback();
	}, [isOpen]);

	return (
		<>
			{typeof onClick === 'undefined' ? (
				<Heading />
			) : isMainHeading ? (
				<MainHeadingButton />
			) : heading ? (
				<HeadingButton />
			) : (
				<ParagraphButton />
			)}
		</>
	);
};
