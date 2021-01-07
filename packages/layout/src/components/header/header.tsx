import React from 'react';
import styles from './header.module.scss';
import { DocWidth, AppWidth, Flex, Link, P } from '@tpr/core';

type HeaderProps = {
	logoSrc: string;
	logoHref: string;
	logoAlt?: string;
	title: string;
	onClickSchemeOptions: () => void;
	onClickLogout: () => void;
};

export const Header: React.FC<HeaderProps> = ({
	logoSrc,
	logoHref,
	logoAlt = 'Go to The Pensions Regulator website',
	title = 'Exchange - Scheme Return',
	onClickLogout,
	onClickSchemeOptions,
}) => {
	return (
		<DocWidth className={styles.headerBackground}>
			<AppWidth>
				<Flex cfg={{ justifyContent: 'space-between', py: 2, pr: 3 }}>
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
						<P cfg={{ color: 'white', fontWeight: 2 }}>{title}</P>
					</Flex>
					<Flex cfg={{ alignItems: 'center' }}>
						<Link
							onClick={onClickSchemeOptions}
							underline
							data-testid="onClickSchemeOptions"
							cfg={{ color: 'white', mr: 4 }}
						>
							Scheme Options
						</Link>
						<Link
							onClick={onClickLogout}
							underline
							cfg={{ color: 'white' }}
							data-testid="onClickLogout"
						>
							Log out
						</Link>
					</Flex>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
