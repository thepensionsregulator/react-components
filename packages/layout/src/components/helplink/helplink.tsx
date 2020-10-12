import React from 'react';
import Collapsible from 'react-collapsible';
import { Hint } from '../hint/hint';
import { ArrowDown } from '@tpr/icons';
import { Flex } from '@tpr/core';
import Styles from './helplink.module.scss';

type HelpLinkProps = {
	title: string;
	content: string;
};

export const HelpLink: React.FC<HelpLinkProps> = ({ title, content }) => {
	return (
		<Collapsible
			trigger={
				<Flex>
					<ArrowDown />
					{title}
				</Flex>
			}
			transitionTime={400}
			triggerClassName={Styles.closed}
			triggerOpenedClassName={Styles.open}
		>
			<Hint>{content}</Hint>
		</Collapsible>
	);
};
