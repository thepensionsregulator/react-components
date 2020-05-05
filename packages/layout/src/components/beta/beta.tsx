import React from 'react';
import styles from './beta.module.scss';
import { DocWidth, AppWidth, Flex, P } from '@tpr/core';

type BetaProps = {};

export const Beta: React.FC<BetaProps> = () => {
	return (
		<DocWidth className={styles.bannerBackground}>
			<AppWidth>
				<Flex cfg={{ alignItems: 'center' }}>
					<Flex cfg={{ bg: 'primary.2', color: 'background', mr: 2, p: 1 }}>
						<P cfg={{ fontSize: 1, p: 1 }}>BETA</P>
					</Flex>
					<P cfg={{ fontSize: 1 }}>
						This is a new service - your feedback will help us improve it.
					</P>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
