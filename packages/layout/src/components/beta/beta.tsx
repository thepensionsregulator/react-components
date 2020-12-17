import React from 'react';
import { AppWidth, DocWidth, Flex, Link, P } from '@tpr/core';
import style from './beta.module.scss';

type BetaHeaderProps = {
	text?: string;
};

export const BetaHeader: React.FC<BetaHeaderProps> = ({ text }) => {
	return (
		<DocWidth className={style.beta}>
			<AppWidth>
				<Flex cfg={{ alignItems: 'center' }}>
					<P
						cfg={{
							fontSize: 1,
							color: 'white',
							bg: 'primary.3',
							p: 1,
							my: 2,
							mr: 3,
						}}
					>
						BETA
					</P>
					<P cfg={{ fontSize: 1, color: 'neutral.6' }}>
						{text ? (
							text
						) : (
							<>
								This is a new service - your{' '}
								<Link
									onClick={() => {
										location.href =
											'mailto:webfeedback@tpr.gov.uk&subject=Portal Scheme Return feedback';
									}}
								>
									feedback
								</Link>{' '}
								will help us improve it
							</>
						)}
					</P>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
