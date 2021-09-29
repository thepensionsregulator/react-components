import React from 'react';
import { AppWidth, DocWidth, Flex } from '@tpr/core';
import styles from './highlight.module.scss';

type HighlightProps = {
	context?: string;
	name: string;
	reference: string;
	testId?: string;
};
export const Highlight: React.FC<HighlightProps> = ({
	context,
	name,
	reference,
}) => {
	return (
		<DocWidth className={styles.highlight}>
			<AppWidth className={styles.highlightContent}>
				<Flex className={styles.context}>{context}</Flex>
				<div className={styles.container}>
					<div className={styles.name}>{name}</div>
					<div className={styles.reference}>
						<Flex>{reference}</Flex>
					</div>
				</div>
			</AppWidth>
		</DocWidth>
	);
};
