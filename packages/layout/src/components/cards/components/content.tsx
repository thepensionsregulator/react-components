import React from 'react';
import { classNames } from '@tpr/core';
import { Toolbar } from './card';
import { cardType, cardTypeName } from '../common/interfaces';
import styles from './content.module.scss';

export const Loading = () => <div className={styles.loading} />;

type ContentProps = {
	type: cardType;
	typeName?: cardTypeName | string;
	title?: string;
	loading?: boolean;
	breadcrumbs?: any;
	subtitle?: string;
	sectionTitle?: string;
};
export const Content: React.FC<ContentProps> = ({
	type,
	typeName,
	children,
	title,
	loading = false,
	breadcrumbs: Breadcrumbs,
	subtitle,
	sectionTitle,
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
			{title && (
				<Toolbar
					type={type}
					typeName={typeName}
					title={title}
					subtitle={subtitle}
					sectionTitle={sectionTitle}
				/>
			)}
			{children}
		</div>
	);
};
