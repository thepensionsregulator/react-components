import React, { useEffect, useRef, MutableRefObject } from 'react';
import { Flex, P } from '@tpr/core';
import styles from './button.module.scss';
import { EditArrowUp, EditArrowDown } from './arrowButton';
import { ArrowDown, ArrowUp } from '@tpr/icons';

type UnderlinedButtonProps = {
	isOpen?: boolean;
	onClick?: any;
	tabIndex?: number;
	isEditButton?: boolean;
	onCollapseCallback?: () => void;
	btnRef?: MutableRefObject<any>;
};

export const UnderlinedButton: React.FC<UnderlinedButtonProps> = ({
	children,
	isOpen,
	onClick,
	tabIndex,
	isEditButton,
	onCollapseCallback,
	btnRef,
}) => {
	if (typeof onClick === 'undefined') {
		return (
			<div className={styles.buttonPlaceholder}>
				<Flex cfg={{ flex: '0 0 auto', alignItems: 'center' }}>
					<P cfg={{ fontSize: 2, fontWeight: 3 }}>{children}</P>
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
				<P cfg={{ fontSize: 2, fontWeight: 3 }}>{children}</P>
				{getAppropriateButton()}
			</Flex>
		</button>
	);
};
