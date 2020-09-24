import { Flex, P } from '@tpr/core';
import React from 'react';

type HintProps = {
	hintText: string;
};

export const Hint = (props: HintProps) => (
	<Flex>
		<P>{props.hintText}</P>
	</Flex>
);
