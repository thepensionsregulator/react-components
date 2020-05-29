import React from 'react';
import { Flex, P } from '@tpr/core';
import { ArrowUp, ArrowDown } from '@tpr/icons';
import styles from './button.module.scss';

type UnderlinedButtonProps = {
	isOpen?: boolean;
	onClick?: any;
};
export const UnderlinedButton: React.FC<UnderlinedButtonProps> = ({
	children,
	isOpen,
	onClick,
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

	return (
		<button className={styles.button} onClick={onClick}>
			<Flex cfg={{ flex: '0 0 auto', alignItems: 'center' }}>
				<P cfg={{ fontSize: 2, fontWeight: 3 }}>{children}</P>
				{isOpen ? (
					<ArrowUp width="24px" fill="#036db8" />
				) : (
					<ArrowDown width="24px" fill="#036db8" />
				)}
			</Flex>
		</button>
	);
};
