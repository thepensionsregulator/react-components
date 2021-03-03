import { Flex } from '@tpr/core';
import React from 'react';
import Styles from './hint.module.scss';
type HintProps = {
	children?: any;
	expanded?: boolean;
}
export const Hint = (props: HintProps) => (
	<Flex cfg={{ pl: 3 }} className={props.expanded ? Styles.root : Styles.collapsed}>
		{props.children}
	</Flex>
);
