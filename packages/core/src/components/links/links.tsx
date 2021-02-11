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
	[key: string]: any;
};
export const Link: React.FC<LinkProps> = ({
	cfg: globalStyles,
	underline = false,
	className,
	testId,
	children,
	...props
}) => {
	const classNames = useClassNames(globalStyles, [
		styles.link,
		{ [styles['link-underline']]: underline },
		className,
	]);

	const anchorProps = {
		'data-testid': testId,
		className: classNames,
		tabIndex: props.href ? null : 0,
		href: props.href ? props.href : 'javascript:;',
		...props,
	};

	return React.createElement('a', anchorProps, children);
};
