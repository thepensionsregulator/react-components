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
		return text
			? () => <P>{text}</P>
			: () => (
					<P>
						This is a new service - your{' '}
						<Link
							anchorTag={true}
							href={
								mail
									? `mailto:${mail.email || ''}&subject=${mail.subject || ''}`
									: 'mailto:'
							}
						>
							feedback
						</Link>{' '}
						will help us improve
					</P>
			  );
	}, [text, mail]);

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
						<TextComponent />
					</P>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
