import React, { createElement, useMemo } from 'react';
import styles from './typography.module.scss';
import {
	SpaceProps,
	TypographyProps,
	BackgroundProps,
	ColorProps,
	CursorProps,
} from '../globals/globals';
import { classNames } from '../../utils';
import { useClassNames } from '../../hooks/use-class-names';

export type AvailableTags =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'p'
	| 'span'
	| 'hr'
	| 'b';

export type TextProps = {
	className?: string;
	tag: AvailableTags;
	cfg?: SpaceProps &
		TypographyProps &
		BackgroundProps &
		ColorProps &
		CursorProps;
	[key: string]: any;
};
export const Text: React.FC<TextProps> = ({
	tag = '',
	className,
	children,
	cfg = {},
	...props
}) => {
	const tagClassName = useMemo(() => styles[tag], [tag]);
	const classNames = useClassNames(cfg, [tagClassName, className]);
	return createElement(
		tag,
		{
			className: classNames,
			...props,
		},
		children,
	);
};

export type TagProps = Partial<TextProps>;

export const H1: React.FC<TagProps> = ({ ...props }) => {
	return <Text tag="h1" {...props} />;
};

export const H2: React.FC<TagProps> = ({ ...props }) => {
	return <Text tag="h2" {...props} />;
};

export const H3: React.FC<TagProps> = ({ ...props }) => {
	return <Text tag="h3" {...props} />;
};

export const H4: React.FC<TagProps> = ({ ...props }) => {
	return <Text tag="h4" {...props} />;
};

export const H5: React.FC<TagProps> = ({ ...props }) => {
	return <Text tag="h5" {...props} />;
};

export const H6: React.FC<TagProps> = ({ ...props }) => {
	return <Text tag="h6" {...props} />;
};

export const P: React.FC<TagProps> = ({ ...props }) => {
	return <Text tag="p" {...props} />;
};

export const Span: React.FC<TagProps> = ({ ...props }) => {
	return <Text tag="span" {...props} />;
};

export const B: React.FC<TagProps> = ({ className, ...props }) => {
	return (
		<Text tag="b" className={classNames([styles.bold, className])} {...props} />
	);
};

export const Hr: React.FC<TagProps> = ({ className, ...props }) => {
	return (
		<Text tag="hr" className={classNames([styles.hr, className])} {...props} />
	);
};
