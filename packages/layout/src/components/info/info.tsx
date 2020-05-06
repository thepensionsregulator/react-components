import React from 'react';
import styles from './info.module.scss';
import { H2 } from '@tpr/core';

type InfoProps = {
	important?: string;
	title?: string;
};

export const Info: React.FC<InfoProps> = ({
	children,
	title,
	important = undefined,
}) => {
	const isImportant = typeof important === 'string' && important.length > 0;
	return (
		<div className={isImportant ? styles.infoImportant : styles.info}>
			{isImportant && <div className={styles.important}>{important}</div>}
			{title && <H2 cfg={{ mb: 2 }}>{title}</H2>}
			{children}
		</div>
	);
};
