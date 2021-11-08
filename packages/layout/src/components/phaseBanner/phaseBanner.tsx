import React from 'react';
import { AppWidth, DocWidth, Flex, P } from '@tpr/core';
import style from './phaseBanner.module.scss';

export const PhaseBanner: React.FC = ({ children }) => {
	const BetaIcon = () => (
		<P className={style.beta} testid="beta-icon">
			BETA
		</P>
	);

	return (
		<DocWidth className={style.phaseBanner}>
			<AppWidth>
				<Flex className={style.innerWrapper}>
					<BetaIcon />
					{children}
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
