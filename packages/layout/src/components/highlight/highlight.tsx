import React from 'react';
import { AppWidth, DocWidth, Flex, P } from '@tpr/core';
import styles from './highlight.module.scss';

type HighlightProps = {
	title: string;
	scheme: string;
	testId?: string;
};
export const Highlight: React.FC<HighlightProps> = ({
	title = '',
	scheme = '',
}) => {
	return (
		<DocWidth className={styles.highlight}>
			<div className={styles.leftBackground} />
			<AppWidth className={styles.highlightContent}>
				<Flex cfg={{ flex: '0 0 auto' }} className={styles.schemeReturn}>
					<P cfg={{ fontWeight: 3 }}>Scheme return</P>
				</Flex>
				<Flex
					cfg={{
						flex: '1 1 auto',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<P cfg={{ fontWeight: 3, px: 4 }} className={styles.truncate}>
						{title}
					</P>
					<Flex
						cfg={{ flex: '0 0 auto', alignItems: 'center', pl: 3 }}
						className={styles.psrNumber}
					>
						<P cfg={{ fontWeight: 3 }}>PSR: {scheme}</P>
					</Flex>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
