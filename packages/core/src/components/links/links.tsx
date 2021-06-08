import React from 'react';
import {
	SpaceProps,
	ColorProps,
	TypographyProps,
	LayoutProps,
} from '../globals/globals';
import { useClassNames } from '../../hooks/use-class-names';
import styles from './links.module.scss';

export type LinkProps = {
	cfg?: SpaceProps & ColorProps & TypographyProps & LayoutProps;
	className?: string;
	underline?: boolean;
	testId?: string;
	taskList?: boolean;
	[key: string]: any;
};
export const Link: React.FC<LinkProps> = ({
	cfg: globalStyles,
	underline = false,
	className,
	testId,
	taskList = false,
	children,
	...props
}) => {
	const classNames = useClassNames(globalStyles, [
		styles.link,
		{ [styles['link-underline']]: underline },
		className,
	]);

	let anchorProps = {
		'data-testid': testId,
		className: classNames,
		href: props.href ? props.href : '#',
		onClick: null,
		...props,
	};

	if (props.onClick && (!props.href || taskList)) {
		anchorProps.onClick = function (e) {
			e.preventDefault();
			props.onClick();
		};
	}

	return React.createElement('a', anchorProps, children);
};
