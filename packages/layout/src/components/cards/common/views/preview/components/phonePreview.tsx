import React from 'react';
import { P, Span } from '@tpr/core';
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
				<P x-ms-format-detection="none" className={styles.noMarginBottom}>
					{value}
				</P>
			</>
		);
	},
);
