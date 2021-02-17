import React from 'react';
import { AppWidth, DocWidth, P, Flex, Link } from '@tpr/core';
import styles from './footer.module.scss';

type FooterLinkProps = {
	title: string;
	url: string;
	size?: number;
};

type FooterProps = {
	/** accepts an array of type FooterLinkProps objects */
	links: FooterLinkProps[];
	/** accepts a valid logo url, must be https */
	logoUrl?: string;
	logoAlt?: string;
	/** accepts copyright description */
	copyright?: string;
};
export const Footer: React.FC<FooterProps> = ({
	logoUrl,
	logoAlt = 'The Pensions Regulator logo',
	copyright = '© 2020 The Pensions Regulator',
	links,
}) => {
	return (
		<DocWidth className={styles.wrapper}>
			<AppWidth>
				<Flex cfg={{ flexDirection: 'column' }}>
					<Flex
						cfg={{ justifyContent: 'flex-start', p: 6, alignItems: 'center' }}
					>
						<img src={logoUrl} alt={logoAlt} width="180" height="75" />
					</Flex>
					<Flex
						cfg={{ justifyContent: 'space-between', mt: 3, px: 6 }}
						className={styles.footerText}
					>
						<Flex>
							{links.map(({ url, title, ...linkProps }, key: number) => (
								<Link
									key={key}
									href={url}
									cfg={{ mr: 3, color: 'neutral.a2' }}
									{...linkProps}
								>
									{title}
								</Link>
							))}
						</Flex>
						<P cfg={{ fontSize: 1, color: 'neutral.a2' }}>{copyright}</P>
					</Flex>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
