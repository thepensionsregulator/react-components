import React from 'react';
import { SpinnerProps } from '../types';
import styles from './spinners.module.scss';

export const LoadingSpinnerCircle: React.FC<SpinnerProps> = ({
	text = 'Loading...',
	iconOnly,
}) => {
	return (
		<div className={styles.wrapper1}>
			<div className={styles.spinner1}>
				<div></div>
				<div></div>
			</div>
			{!iconOnly && <div className={styles.text}>{text}</div>}
		</div>
	);
};

export const LoadingSpinnerProgress: React.FC<SpinnerProps> = ({
	text = 'Loading...',
	iconOnly,
}) => {
	return (
		<div className={styles.wrapper2}>
			<div className={styles.spinner2}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			{!iconOnly && <div className={styles.text}>{text}</div>}
		</div>
	);
};
