import React from 'react';
import { classNames } from '@tpr/core';
import { Toolbar } from './card';
import styles from './content.module.scss';

export const Loading = () => <div className={styles.loading} />;

type ContentProps = {
	title?: string;
	loading?: boolean;
	breadcrumbs?: any;
	subtitle?: string;
};
export const Content: React.FC<ContentProps> = ({
	children,
	title,
	loading = false,
	breadcrumbs: Breadcrumbs,
	subtitle,
}) => {
	return (
		<div
			className={classNames([
				{ [styles.noTopPadding]: typeof Breadcrumbs === 'function' },
				styles.content,
			])}
		>
			{loading && <Loading />}
			{Breadcrumbs && <Breadcrumbs />}
			{title && <Toolbar title={title} subtitle={subtitle} />}
			{children}
		</div>
	);
};
