import React from 'react';
import styles from './layout.module.scss';
import { classNames } from '../../utils';

export const AppWidth: React.FC<{ className?: string }> = ({
	children,
	className,
}) => {
	return (
		<div className={classNames([styles.appWidth, className])}>{children}</div>
	);
};

export const DocWidth: React.FC<{ className?: string }> = ({
	children,
	className,
}) => {
	return (
		<div className={classNames([styles.docWidth, className])}>{children}</div>
	);
};
