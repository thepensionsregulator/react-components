import React from 'react';
import styles from './highlight.module.scss';
import { DocWidth, AppWidth, Flex, P } from '@tpr/core';

type HighlightProps = {
	title: string;
	scheme: string;
};

export const Highlight: React.FC<HighlightProps> = ({
	title = "Test Scheme: DC Scheme 3 SQL Update",
	scheme= 'PSR: 12014314',
}) => {
	return (
		<DocWidth>
			<AppWidth>
				<Flex cfg={{flex: "0 0 auto"}}>
				<Flex className={styles.appTitle} cfg={{flex:"1 1 auto", alignItems:"center"}}>
						<P cfg={{color:"background"}}>Scheme return</P>
				</Flex>
				<Flex cfg={{bg:"accents.4", py:2}} className={styles.highlight}>
					<Flex cfg={{flex: "1 1 auto", alignItems:"center", px:4, }}>
						<P cfg={{color:"background"}}>{title}</P>
					</Flex>
					<Flex cfg={{flex: "0 0 auto", alignItems:"center", justifyContent:"center", }} className={styles.schemeName}>
						<P cfg={{color:"background"}}>{scheme}</P>
					</Flex>
				</Flex>
				</Flex>
			</AppWidth>
		</DocWidth>
	)
}
