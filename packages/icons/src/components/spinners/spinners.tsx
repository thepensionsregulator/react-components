import React from 'react';
import { SpinnerProps } from '../types';
import styles from './spinners.module.scss';

export const LoadingSpinnerCircle: React.FC<SpinnerProps> = ({
	text = 'Loading...',
}) => {
	return (
		<div
			className={styles.spinnerCircle}
			data-testid="spinner-circle"
			role="status"
			aria-live="polite" 
		>
			<div className={styles.spinner}>
				<div></div>
				<div></div>
			</div>
			<div className={styles.text}>{text}</div>
		</div>
	);
};

export const LoadingSpinnerProgress: React.FC<SpinnerProps> = ({
	text = 'Loading...',
}) => {
	return (
		<div
			className={styles.spinnerProgress}
			data-testid="spinner-progress"
			role="status"
			aria-live="polite"
		>
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
			<div className={styles.text}>{text}</div>
		</div>
	);
};
