import React from 'react';
import { Span } from '@tpr/core';
import { ParagraphNoMB } from '../../../../components/paragraphNoMB';
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
				<ParagraphNoMB cfg={{ wordBreak: 'all' }}>{value}</ParagraphNoMB>
			</>
		);
	},
);
