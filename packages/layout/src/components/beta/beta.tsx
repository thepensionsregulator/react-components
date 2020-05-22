import React, { useMemo } from 'react';
import { AppWidth, DocWidth, Flex, P } from '@tpr/core';
import style from './beta.module.scss';

type BetaHeaderProps = {
	text: any;
};
export const BetaHeader: React.FC<BetaHeaderProps> = ({ text }) => {
	const TextComponent = useMemo(() => {
		return typeof text === 'function' ? text : () => text;
	}, [text]);

	return (
		<DocWidth className={style.beta}>
			<AppWidth>
				<Flex cfg={{ alignItems: 'center' }}>
					<P
						cfg={{
							fontSize: 1,
							color: 'background',
							bg: 'primary.2',
							p: 1,
							my: 2,
							mr: 3,
						}}
					>
						BETA
					</P>
					<P cfg={{ fontSize: 1, color: 'neutral.3' }}>
						<TextComponent />
					</P>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
