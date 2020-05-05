import React from 'react';
import styles from './header.module.scss';
import {DocWidth, AppWidth,Flex, Link, P} from '@tpr/core';

type HeaderProps = {
	logoUrl: string;
	title: string;
	onClickSchemeOptions: () => void;
	onClickLogout: () => void;
};

export const Header: React.FC<HeaderProps> = ({

}) => {
	return (
		<DocWidth className={styles.headerBackground}>
			<AppWidth>
				<Flex cfg={{justifyContent: "space-between", py: 2}} >
					<Flex cfg={{alignItems: "center"}}>
						<div>
							{/* logo goes here */}
						</div>
						<P>
							{/* title goes here */}
						</P>
					</Flex>
					<Flex cfg={{alignItems: "center"}}>
						<Link>
						</Link>
					</Flex>
				</Flex>
			</AppWidth>
		</DocWidth>
	)
}
