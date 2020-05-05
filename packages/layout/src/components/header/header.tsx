import React from 'react';
import styles from './header.module.scss';
import {DocWidth, AppWidth, Flex, Link, P} from '@tpr/core';

type HeaderProps = {
	logoUrl: string;
	title: string;
	onClickSchemeOptions: () => void;
	onClickLogout: () => void;
};

export const Header: React.FC<HeaderProps> = ({
logoUrl,
title = "Exchange - Scheme Return",
onClickLogout,
onClickSchemeOptions
}) => {
	return (
		<DocWidth className={styles.headerBackground}>
			<AppWidth>
				<Flex cfg={{justifyContent: "space-between", py: 2}} >
					<Flex cfg={{alignItems: "center"}}>
						<div className={styles.logo}>
							<img className={styles.img} src={logoUrl} alt="TPR Logo" />
						</div>
						<P cfg={{color: "background", fontWeight: 2}}>
							{title}
						</P>
					</Flex>
					<Flex cfg={{alignItems:"center"}}>
						<Link onClick={onClickSchemeOptions} underline data-testid="onClickSchemeOptions" cfg={{color:"background", mr: 4}}>
							Scheme Options
						</Link>
						<Link onClick={onClickLogout} underline cfg={{color: "background"}} data-testid="onClickLogout">
							Log out
						</Link>
					</Flex>
				</Flex>
			</AppWidth>
		</DocWidth>
	)
}
