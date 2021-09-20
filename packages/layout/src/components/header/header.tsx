import React from 'react';
import { DocWidth, AppWidth, Flex, Link, P } from '@tpr/core';
import styles from './header.module.scss';

type HeaderProps = {
	logoSrc: string;
	logoHref: string;
	logoAlt?: string;
	title: string;
	schemeOptionsHref: string;
	onClickLogout: () => void;
};

export const Header: React.FC<HeaderProps> = ({
	logoSrc,
	logoHref,
	logoAlt = 'Go to The Pensions Regulator website',
	title = 'Exchange - Scheme Return',
	onClickLogout,
	schemeOptionsHref,
}) => {
	return (
		<DocWidth className={styles.headerBackground}>
			<AppWidth>
				<Flex cfg={{ justifyContent: 'space-between', py: 2, pr: 6 }}>
					<Flex cfg={{ alignItems: 'center' }}>
						<a href={logoHref} className={styles.logo}>
							<img
								className={styles.img}
								src={logoSrc}
								alt={logoAlt}
								width="180"
								height="75"
							/>
						</a>
					</Flex>
					<Flex className={styles.straplineAndLinks}>
						<P
							cfg={{
								color: 'white',
								fontSize: 3,
								fontWeight: 3,
								lineHeight: 5,
								my: 1,
							}}
						>
							{title}
						</P>
						<Flex>
							<Link
								href={schemeOptionsHref}
								underline
								data-testid="onClickSchemeOptions"
								cfg={{ mr: 4 }}
								className={styles.headerlink}
							>
								Scheme Options
							</Link>
							<Link
								onClick={onClickLogout}
								underline
								data-testid="onClickLogout"
								className={styles.headerlink}
							>
								Log out
							</Link>
						</Flex>
					</Flex>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
