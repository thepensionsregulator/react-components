import React, { useEffect, useRef, MutableRefObject } from 'react';
import { Flex, H3, H4, P } from '@tpr/core';
import { ArrowDown, ArrowUp } from '@tpr/icons';
import { EditArrowUp, EditArrowDown } from './arrowButton';
import styles from './button.module.scss';
import { Heading, HeadingProps } from './heading';

interface UnderlinedButtonProps extends HeadingProps {
	buttonRef?: MutableRefObject<any>;
	giveFocus?: boolean;
	heading?: boolean;
	isEditButton?: boolean;
	isOpen?: boolean;
	onClick?: any;
	onCollapseCallback?: () => void;
	tabIndex?: number;
}

/*
	In all cards, we have 2 sections: Toolbar (containing at least the 'Remove' button) & Content (changes depending on the data being edited).
	Because the 'content' section changes, when clicking one of its buttons (on the Preview 'view') the focus needs to be added to the button rendered in the new view in the editing section.
	And when collapsing the editing section, the focus needs to return to the button that was clicked in the 'Preview' view.

	To solve this, 2 new properties need to be passed to the Underlinedbutton component.

	- buttonRef: reference received for buttons from the 'Preview' view.
	- giveFocus: indicates if need to assign focus to the button.

	- onCollapseCallback: callback function that allows to execute additional actions when collapsing an editing section.
*/

export const UnderlinedButton: React.FC<UnderlinedButtonProps> = React.memo(
	({
		children,
		buttonRef,
		giveFocus = false,
		heading = true,
		isEditButton,
		isMainHeading = false,
		isOpen,
		onClick,
		onCollapseCallback,
		tabIndex,
	}) => {
		const editViewButtonRef = useRef(null);

		const getAppropriateIcon = () => {
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
					{getAppropriateIcon()}
				</Flex>
			</button>
		);

		const getButton = () => {
			return isMainHeading ? (
				<MainHeadingButton />
			) : heading ? (
				<HeadingButton />
			) : (
				<ParagraphButton />
			);
		};

		const MainHeadingButton: React.FC = () => (
			<H3 className={styles.heading3} data-testid="card-main-heading-button">
				<ClickableButton />
			</H3>
		);

		const HeadingButton: React.FC = () => (
			<H4
				className={`${styles.heading4} ${isOpen ? '' : styles.headingButton}`}
				data-testid="card-heading-button"
			>
				<ClickableButton />
			</H4>
		);

		const ParagraphButton: React.FC = () => (
			<P
				className={`${styles.heading4} ${styles.removeButton}`}
				data-testid="card-not-heading"
			>
				<ClickableButton />
			</P>
		);

		useEffect(() => {
			isOpen &&
				giveFocus &&
				editViewButtonRef.current &&
				editViewButtonRef.current.focus();
			!isOpen && giveFocus && buttonRef.current && buttonRef.current.focus();
			!isOpen && onCollapseCallback && onCollapseCallback();
		}, [isOpen]);

		return (
			<>
				{typeof onClick === 'undefined' ? (
					<Heading isMainHeading={isMainHeading}>{children}</Heading>
				) : (
					getButton()
				)}
			</>
		);
	},
);
