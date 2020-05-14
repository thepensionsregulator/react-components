import React, { createElement } from 'react';
import styles from './globals.module.scss';
import { useClassNames } from '../../hooks/use-class-names';

export type FullValueRange = 1 | 2 | 3 | 4 | 5 | 6;

export type FlexProps = Partial<{
	/** flex 1 1 auto or flex 0 0 auto */
	flex: '1 1 auto' | '0 0 auto' | '1 0 auto' | '0 1 auto';
	flexDirection: 'column' | 'row';
	alignItems: 'center' | 'flex-start' | 'flex-end';
	justifyContent:
		| 'center'
		| 'flex-start'
		| 'flex-end'
		| 'space-between'
		| 'space-around'
		| 'space-evenly';
}>;

export type CursorProps = Partial<{
	cursor: 'pointer' | 'default' | 'not-allowed';
}>;

export type LayoutProps = Partial<{
	width: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}>;

export type FullColorRange =
	| 'background'
	| 'primary.1'
	| 'primary.2'
	| 'primary.3'
	| 'neutral.1'
	| 'neutral.2'
	| 'neutral.3'
	| 'accents.2'
	| 'accents.3'
	| 'accents.4'
	| 'success.2'
	| 'success.3'
	| 'warning.2'
	| 'warning.3'
	| 'danger.2'
	| 'danger.3';

export type BackgroundProps = Partial<{
	bg: FullColorRange;
}>;

export type ColorProps = Partial<{
	color: FullColorRange;
}>;

export type TypographyProps = Partial<{
	fontSize: FullValueRange;
	textAlign: 'left' | 'center' | 'right';
	fontWeight: 1 | 2 | 3;
}>;

export type SpaceProps = Partial<{
	/** margin */
	m: FullValueRange;
	/** margin top */
	mt: FullValueRange;
	/** margin right */
	mr: FullValueRange;
	/** margin bottom */
	mb: FullValueRange;
	/** margin left */
	ml: FullValueRange;
	/** margin-top and margin-bottom */
	my: FullValueRange;
	/** margin-left and margin-right */
	mx: FullValueRange;
	/** padding */
	p: FullValueRange;
	/** padding top */
	pt: FullValueRange;
	/** padding right */
	pr: FullValueRange;
	/** padding bottom */
	pb: FullValueRange;
	/** padding left */
	pl: FullValueRange;
	/** padding-top and padding-bottom */
	py: FullValueRange;
	/** padding-left and padding-right */
	px: FullValueRange;
}>;

export type FlexBoxProps = {
	className?: string;
	cfg?: FlexProps &
		SpaceProps &
		BackgroundProps &
		ColorProps &
		LayoutProps &
		CursorProps;
	[key: string]: any;
};
export const Flex: React.FC<FlexBoxProps> = ({
	className,
	children,
	cfg = {},
	...props
}) => {
	const classNames = useClassNames(cfg, [styles.flex, className]);
	return createElement(
		'div',
		{
			className: classNames,
			...props,
		},
		children,
	);
};

export const matchClassName = (
	className: string,
	selector: string | boolean,
) => {
	/** if selector is boolean, include the class name */
	if (typeof selector === 'boolean') return className;
	/** TODO? if we provide and array of values, we could process that for different screen sizes */
	if (Array.isArray(selector)) {
		return className;
	}
	/** if selector is a string with spaces then join it with dashes to match an appropriate class name */
	const classParams = `${selector}`.split(/[ .]+/).join('-');
	/** select matched style from styles if any */
	return styles[`${className}-${classParams}`];
};
