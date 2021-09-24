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
				<Flex className={styles.container}>
					<Flex className={styles.name}>{name}</Flex>
					<Flex className={styles.reference}>
						<Flex>{reference}</Flex>
					</Flex>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
