import React from 'react';
import Collapsible from 'react-collapsible';
import { Hint } from '../hint/hint';
import { ArrowDown } from '@tpr/icons';
import { Flex } from '@tpr/core';
import Styles from './helplink.module.scss';

type HelpLinkProps = {
	Title: string;
	Content: string;
};

type HelpLinkPropsFields = { fields: HelpLinkProps };

export const HelpLink: React.FC<HelpLinkPropsFields> = (
	props: HelpLinkPropsFields,
) => {
	return (
		<Collapsible
			trigger={
				<Flex>
					<ArrowDown />
					{props.fields.Title}
				</Flex>
			}
			transitionTime={400}
			triggerClassName={Styles.closed}
			triggerOpenedClassName={Styles.open}
		>
			<Hint>{props.fields.Content}</Hint>
		</Collapsible>
	);
};
