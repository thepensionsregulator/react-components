import React from 'react';
import { P, TextProps } from '@tpr/core';
import styles from '../cards.module.scss';

export const ParagraphNoMB: React.FC<Partial<TextProps>> = ({
	children,
	...rest
}) => {
	return (
		<P className={styles.noMarginBottom} {...rest}>
			<>{children}</>
		</P>
	);
};
