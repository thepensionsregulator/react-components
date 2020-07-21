import React from 'react';
import { Flex } from '@tpr/core';
import { InsurerProvider, InsurerProviderProps } from './context';

export const Insurer: React.FC<InsurerProviderProps> = ({
	testId,
	cfg,
	...rest
}) => {
	return (
		<InsurerProvider {...rest}>
			{() => {
				return (
					<Flex cfg={cfg} data-testid={testId}>
						Hello from Insurer Card
					</Flex>
				);
			}}
		</InsurerProvider>
	);
};
