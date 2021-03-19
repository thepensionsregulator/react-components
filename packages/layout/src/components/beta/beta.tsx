import React, { useMemo } from 'react';
import { AppWidth, DocWidth, Flex, Link, P } from '@tpr/core';
import style from './beta.module.scss';

type BetaHeaderProps = {
	text?: string;
	mail?: MailToProps;
};

type MailToProps = {
	email: string;
	subject: string;
};

export const BetaHeader: React.FC<BetaHeaderProps> = ({ text, mail }) => {
	const TextComponent = useMemo(() => {
		return () => (
			<P cfg={{ fontSize: 2, color: 'neutral.8', my: 1 }}>
				{text ? (
					text
				) : (
					<>
						This is a new service — your{' '}
						<Link
							href={
								mail
									? `mailto:${mail.email || ''}&subject=${mail.subject || ''}`
									: 'mailto:'
							}
						>
							feedback
						</Link>{' '}
						will help us improve it.
					</>
				)}
			</P>
		);
	}, [text, mail]);

	return (
		<DocWidth className={style.beta}>
			<AppWidth>
				<Flex cfg={{ alignItems: 'center', px: 6 }}>
					<P
						cfg={{
							fontSize: 2,
							fontWeight: 4,
							color: 'white',
							bg: 'primary.3',
							p: 2,
							my: 2,
							mr: 3,
						}}
					>
						BETA
					</P>
					<TextComponent />
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
