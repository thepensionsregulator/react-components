import React from 'react';
import { Flex } from '@tpr/core';
import Styles from './hint.module.scss';

type HintProps = {
	className?: string;
	children?: any;
	expanded?: boolean;
};

export const Hint = (props: HintProps) => {
	let className = props.expanded ? Styles.root : Styles.collapsed;
	if (props.className) {
		className += ' ' + props.className;
	}
	return (
		<Flex cfg={{ pl: 3 }} className={className}>
			{props.children}
		</Flex>
	);
};
