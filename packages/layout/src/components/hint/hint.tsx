import { Flex } from '@tpr/core';
import React from 'react';
import Styles from './hint.module.scss';

export const Hint = (props: any) => (
	<Flex cfg={{ pl: 3 }} className={Styles.root}>
		{props.children}
	</Flex>
);
