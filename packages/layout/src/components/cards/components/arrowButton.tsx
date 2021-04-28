import React from 'react';
import { SVGProps, SVG } from '@tpr/icons';
import { Flex, P } from '@tpr/core';
import styles from './button.module.scss';

export const EditArrowUp: React.FC<SVGProps> = (props) => {
	return (
		<Flex>
			<P className={styles.arrowButtonEdit}> Edit</P>
			<SVG testId="arrow-up" {...props}>
				<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
				<path d="M0 0h24v24H0z" fill="none" />
			</SVG>
		</Flex>
	);
};

export const EditArrowDown: React.FC<SVGProps> = (props) => {
	return (
		<Flex>
			<P className={styles.arrowButtonEdit}>Edit</P>
			<SVG testId="arrow-down" {...props}>
				<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
				<path d="M0 0h24v24H0V0z" fill="none" />
			</SVG>
		</Flex>
	);
};
