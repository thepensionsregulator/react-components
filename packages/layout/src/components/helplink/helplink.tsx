import React from 'react';
import Collapsible from 'react-collapsible';
import { Hint } from './hint/hint';

type HelpLinkProps = {
	Title: string;
	Content: string;
};

type HelpLinkPropsFields = { fields: HelpLinkProps };

export const HelpLink: React.FC<HelpLinkPropsFields> = (
	props: HelpLinkPropsFields,
) => (
	<Collapsible trigger={props.fields.Title} transitionTime={2000}>
		<Hint hintText={props.fields.Content} />
	</Collapsible>
);
