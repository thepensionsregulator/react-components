import React from 'react';
import { Flex } from '@tpr/core';
import { PersistentPosconProps } from './/types';

export const PersistentPoscon: React.FC<PersistentPosconProps> = React.memo(
	({ cfg, children, ariaLabelledBy }) => {
		return (
			<Flex cfg={cfg} role="alert" aria-labelledBy={ariaLabelledBy}>
				{children}
			</Flex>
		);
	},
);
