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
				<Flex cfg={{ justifyContent: 'space-between', py: 2, px: 6 }}>
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
					<Flex
						cfg={{
							alignItems: 'center',
							justifyContent: 'space-between',
							width: 10,
						}}
					>
						<P
							cfg={{
								color: 'white',
								fontSize: 3,
								fontWeight: 3,
								lineHeight: 5,
							}}
						>
							{title}
						</P>
						<Flex>
							<Link
								onClick={onClickSchemeOptions}
								underline
								data-testid="onClickSchemeOptions"
								cfg={{ color: 'white', mr: 4, fontWeight: 3, lineHeight: 3 }}
							>
								Scheme Options
							</Link>
							<Link
								onClick={onClickLogout}
								underline
								cfg={{ color: 'white', fontWeight: 3, lineHeight: 3 }}
								data-testid="onClickLogout"
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
