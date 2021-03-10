import React from 'react';
import { P, Span } from '@tpr/core';
import styles from '../../../../cards.module.scss';

interface EmailPreviewProps {
	label?: string;
	value: string;
}

export const EmailPreview: React.FC<EmailPreviewProps> = React.memo(
	({ label = 'Email', value }) => {
		return (
			<>
				<Span cfg={{ lineHeight: 3 }} className={styles.styledAsH4}>
					{label}
				</Span>
				<P cfg={{ wordBreak: 'all' }} className={styles.noMarginBottom}>
					{value}
				</P>
			</>
		);
	},
);
