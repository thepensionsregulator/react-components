import { Flex, H3, H4 } from '@tpr/core';
import React from 'react';
import styles from './button.module.scss';

export interface HeadingProps {
	isMainHeading?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
	isMainHeading,
	children,
}) => (
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
