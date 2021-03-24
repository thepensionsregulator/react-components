import React from 'react';
import { P } from '@tpr/core';
import styles from '../../../../cards.module.scss';

interface EmailPreviewProps {
	label?: string;
	value: string;
}

export const EmailPreview: React.FC<EmailPreviewProps> = React.memo(
	({ label = 'Email', value }) => {
		return (
			<>
				<P className={styles.emailPhonePreviewLabel}>{label}</P>
				<P className={styles.emailPhonePreviewValue} cfg={{ wordBreak: 'all' }}>
					{value}
				</P>
			</>
		);
	},
);
