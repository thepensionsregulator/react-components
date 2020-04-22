import React from 'react';
import styles from './typography.module.css';

type CSSH1Props = {
	kobra11?: string;
};
export const CSSH1: React.FC<CSSH1Props> = ({ children, kobra11 }) => {
	return (
		<h1 className={styles.h1tag}>
			{kobra11 ? kobra11 : null}
			<div>{children}</div>
		</h1>
	);
};
