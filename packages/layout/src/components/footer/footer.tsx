import React from 'react';
import styles from './footer.module.scss';
import { DocWidth, AppWidth, Flex, Link, P } from '@tpr/core';

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
	/** accepts copyright description */
	copyright?: string;
};

export const Footer: React.FC<FooterProps> = ({
	logoUrl,
	copyright = '© The Pensions Regulator',
	links,
}) => {
	return (
		<DocWidth className={styles.footer}>
			<AppWidth>
				<Flex cfg={{ flexDirection: 'column', px: 6 }}>
					<Flex
						cfg={{ justifyContent: 'flex-start', py: 6, alignItems: 'center' }}
					>
						<div className={styles.logo}>
							<img className={styles.img} src={logoUrl} alt="TPR Logo" />
						</div>
					</Flex>
					<Flex
						className={styles.lowerPart}
						cfg={{
							justifyContent: 'space-between',
							mt: 3,
							px: 2,
						}}
					>
						<Flex>
							{links.map(({ title, url, ...linkProps }, key: number) => (
								<Link
									key={key}
									href={url}
									cfg={{ mr: 3, color: 'neutral.3' }}
									{...linkProps}
								>
									{title}
								</Link>
							))}
						</Flex>
						<P>{copyright}</P>
					</Flex>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
