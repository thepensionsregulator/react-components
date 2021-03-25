import React from 'react';
import { Flex, P } from '@tpr/core';
import styles from '../../../../../cards.module.scss';

interface EmailPhoneProps {
	label?: string;
	value: string;
}

interface ContactDetailsPreviewProps {
	name?: string;
	phone?: EmailPhoneProps;
	email?: EmailPhoneProps;
}

export const ContactDetailsPreview: React.FC<ContactDetailsPreviewProps> = React.memo(
	(props: ContactDetailsPreviewProps) => {
		return (
			<Flex cfg={{ my: 2, flexDirection: 'column' }}>
				{props.name && <P cfg={{ mb: 2 }}>{props.name}</P>}
				{props.phone && (
					<>
						<P className={styles.emailPhonePreviewLabel}>
							{props.phone.label ? props.phone.label : 'Phone'}
						</P>
						<P
							className={styles.emailPhonePreviewValue}
							x-ms-format-detection="none"
						>
							{props.phone.value}
						</P>
					</>
				)}
				{props.email && (
					<>
						<P className={styles.emailPhonePreviewLabel}>
							{props.email.label ? props.email.label : 'Email'}
						</P>
						<P
							className={styles.emailPhonePreviewValue}
							cfg={{ wordBreak: 'all' }}
						>
							{props.email.value}
						</P>
					</>
				)}
			</Flex>
		);
	},
);
