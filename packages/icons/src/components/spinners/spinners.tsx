import React from 'react';
import { SpinnerProps } from '../types';
import styles from './spinners.module.scss';

export const LoadingSpinnerProgress: React.FC<SpinnerProps> = ({
	text = 'Loading...',
}) => {
	return (
		<div
			className={styles.spinnerProgress}
			data-testid="spinner-progress"
			role="alert"
			aria-busy="true"
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
