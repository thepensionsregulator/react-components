import React from 'react';
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
	subSectionHeaderText?: string;
	send?: Function;
};
export const Content: React.FC<ContentProps> = ({
	children,
	title,
	loading = false,
	breadcrumbs: Breadcrumbs,
	subtitle,
	sectionTitle,
	subSectionHeaderText,
	send,
}) => {
	console.log('section title', sectionTitle);
	return (
		<div className={styles.content}>
			{loading && <Loading />}
			{Breadcrumbs && <Breadcrumbs />}
			{title && (
				<Toolbar
					title={title}
					subtitle={subtitle}
					sectionTitle={sectionTitle}
					subSectionHeaderText={subSectionHeaderText}
					send={send}
				/>
			)}
			{children}
		</div>
	);
};
