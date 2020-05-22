import React from 'react';
import { AppWidth, DocWidth, P, Flex, Link } from '@tpr/core';
import styles from './footer.module.scss';

type FooterLinkProps = {
	title: string;
	url: string;
	size?: number;
};

type FooterProps = {
	/** function to handle link clicks */
	onLinkClickHandler: (url: string) => void;
	/** accepts an array of type FooterLinkProps objects */
	links: FooterLinkProps[];
	/** accepts a valid logo url, must be https */
	logoUrl?: string;
	/** accepts copyright description */
	copyright?: string;
};
export const Footer: React.FC<FooterProps> = ({
	logoUrl,
	copyright = '© 2020 The Pensions Regulator',
	onLinkClickHandler,
	links,
}) => {
	return (
		<DocWidth className={styles.wrapper}>
			<AppWidth>
				<Flex cfg={{ flexDirection: 'column' }}>
					<Flex
						cfg={{ justifyContent: 'flex-start', py: 6, alignItems: 'center' }}
					>
						<div className={styles.logo}>
							<img src={logoUrl} alt="TPR Logo" />
						</div>
					</Flex>
					<Flex
						cfg={{ justifyContent: 'space-between', mt: 3 }}
						className={styles.footerText}
					>
						<Flex>
							{links.map(({ url, title, ...linkProps }, key: number) => (
								<Link
									key={key}
									onClick={() => onLinkClickHandler(url)}
									cfg={{ mr: 3, color: 'neutral.3' }}
									{...linkProps}
								>
									{title}
								</Link>
							))}
						</Flex>
						<P cfg={{ fontSize: 1, color: 'neutral.3' }}>{copyright}</P>
					</Flex>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
