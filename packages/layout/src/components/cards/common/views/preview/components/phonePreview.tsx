import React from 'react';
import { Span } from '@tpr/core';
import { ParagraphNoMB } from '../../../../components/paragraphNoMB';
import styles from '../../../../cards.module.scss';

interface PhonePreviewProps {
	label?: string;
	value: string;
}

export const PhonePreview: React.FC<PhonePreviewProps> = React.memo(
	({ label = 'Phone', value }) => {
		return (
			<>
				<Span cfg={{ lineHeight: 3 }} className={styles.styledAsH4}>
					{label}
				</Span>
				<ParagraphNoMB x-ms-format-detection="none">{value}</ParagraphNoMB>
			</>
		);
	},
);
