import React from 'react';
import { classNames, H2 } from '@tpr/core';
import styles from './info.module.scss';

type InfoProps = { title?: string; importantMessage?: string };
export const Info: React.FC<InfoProps> = ({
	children,
	title,
	importantMessage,
}) => {
	return (
		<div
			className={classNames([
				styles.info,
				{ [styles['important']]: importantMessage ? true : false },
			])}
		>
			{importantMessage && (
				<div className={styles.importantMessage}>{importantMessage}</div>
			)}
			{title && <H2 cfg={{ mb: 2 }}>{title}</H2>}
			{children}
		</div>
	);
};
