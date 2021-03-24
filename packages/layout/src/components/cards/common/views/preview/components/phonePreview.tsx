import React from 'react';
import { P } from '@tpr/core';
import styles from '../../../../cards.module.scss';

interface PhonePreviewProps {
	label?: string;
	value: string;
}

export const PhonePreview: React.FC<PhonePreviewProps> = React.memo(
	({ label = 'Phone', value }) => {
		return (
			<>
				<P className={styles.emailPhonePreviewLabel}>{label}</P>
				<P
					x-ms-format-detection="none"
					className={styles.emailPhonePreviewValue}
				>
					{value}
				</P>
			</>
		);
	},
);
