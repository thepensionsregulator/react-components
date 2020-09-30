import React, { Children, cloneElement } from 'react';
import { Flex } from '@tpr/core';
import styles from './separator.module.scss';

/**
 *
 * @param children property hint will be removed and cfg will get merged.
 */
export const SeparatorX = ({ children }) => {
	const clones = Children.map(children, ({ props, ...child }) => {
		const { hint, cfg = {}, ...allProps } = props;
		return cloneElement(child, {
			cfg: Object.assign(cfg, { mr: 8 }),
			hint,
			className: styles.maxWidth,
			...allProps,
		});
	});

	return <Flex>{clones}</Flex>;
};

/**
 *
 * @param children property cfg will be overwritten.
 */
export const SeparatorY = ({ children }) => {
	const clones = Children.map(children, (child) =>
		cloneElement(child, { cfg: { mt: 1, mb: 3 } }),
	);

	return <Flex cfg={{ flexDirection: 'column' }}>{clones}</Flex>;
};
