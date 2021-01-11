import React from 'react';
import { SpinnerProps } from '../types';
import styles from './spinners.module.scss';

export const LoadingSpinnerCircle: React.FC<SpinnerProps> = ({
	text = 'Loading...',
	iconOnly,
}) => {
	return (
		<div className={styles.spinnerCircle} data-testid="spinner-circle">
			<div className={styles.spinner}>
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
		<div className={styles.spinnerProgress} data-testid="spinner-progress">
			<div className={styles.spinner}>
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
