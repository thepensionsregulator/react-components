import React from 'react';
import Collapsible from 'react-collapsible';
import { Hint } from '../hint/hint';
import { ArrowDown } from '@tpr/icons';
import Styles from './helplink.module.scss';

type HelpLinkProps = {
	title: string;
	className?: string;
	triggerClassName?: string;
	contentClassName?: string;
};

export const HelpLink: React.FC<HelpLinkProps> = (props) => {
	// Use a separate component for the trigger so that we can set aria-expanded, and place the inline SVG inside the button
	const [expanded, setExpanded] = React.useState(false);
	const Trigger = () => (
		<button aria-expanded={expanded} type="button" data-gtm="helpLink">
			<ArrowDown />
			{props.title}
		</button>
	);

	// Update a status to announce when the component is expanded/collapsed, because the trigger button loses focus which prevents the change to aria-expanded being announced.
	// Using a ref to get the button element and call its focus() method doesn't work.
	const [accessibleStatus, setAccessibleStatus] = React.useState<string>();
	function updateStatus() {
		setAccessibleStatus(expanded ? 'collapsed' : 'expanded');
		setTimeout(() => setAccessibleStatus(''), 4000);
	}

	return (
		<>
			<Collapsible
				trigger={<Trigger />}
				classParentString={`${Styles.helpLink} ${props.className}`.trim()}
				contentInnerClassName={`${Styles.helpLinkContent} ${props.contentClassName}`.trim()}
				overflowWhenOpen="visible"
				onOpening={() => {
					setExpanded(true);
					updateStatus();
				}}
				onClosing={() => {
					setExpanded(false);
					updateStatus();
				}}
			>
				<Hint expanded={expanded}>{props.children}</Hint>
				<p role="status" className={Styles.visuallyHidden}>
					{accessibleStatus}
				</p>
			</Collapsible>
		</>
	);
};
