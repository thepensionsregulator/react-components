import React from 'react';
import { Toolbar } from './card';
import styles from './content.module.scss';

export const Loading = () => <div className={styles.loading} />;

type ContentProps = {
	title?: string;
	loading?: boolean;
};
export const Content: React.FC<ContentProps> = ({
	children,
	title,
	loading = false,
}) => {
	return (
		<div className={styles.content}>
			{loading && <Loading />}
			{title && <Toolbar title={title} />}
			{children}
		</div>
	);
};
