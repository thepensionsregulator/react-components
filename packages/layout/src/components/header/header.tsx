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
	title = 'Making workplace pensions work',
	onClickLogout,
	schemeOptionsHref,
}) => {
	return (
		<DocWidth className={styles.header}>
			<AppWidth className={styles.headerContent}>
				<a href={logoHref} className={styles.logo}>
					<img src={logoSrc} alt={logoAlt} width="180" height="75" />
				</a>
				<P className={styles.title}>{title}</P>
				<Flex className={styles.links}>
					<Link
						href={schemeOptionsHref}
						underline
						data-testid="onClickSchemeOptions"
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
			</AppWidth>
		</DocWidth>
	);
};
