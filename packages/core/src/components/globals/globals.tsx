import React, { createElement } from 'react';
import styles from './globals.module.scss';
import { useClassNames } from '../../hooks/use-class-names';

export type ValuesFullRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

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
	width: ValuesFullRange;
}>;

export type ColorsPrimary =
	| 'primary.1'
	| 'primary.2'
	| 'primary.3'
	| 'primary.4'
	| 'primary.a1'
	| 'primary.a2';

export type ColorsNeutral =
	| 'neutral.1'
	| 'neutral.2'
	| 'neutral.3'
	| 'neutral.4'
	| 'neutral.5'
	| 'neutral.6'
	| 'neutral.7'
	| 'neutral.8'
	| 'neutral.a1'
	| 'neutral.a2';

export type ColorsAccents = 'accents.1' | 'accents.2';

export type ColorsSuccess = 'success.1';

export type ColorsWarning = 'warning.1' | 'warning.a1';

export type ColorsDanger = 'danger.1' | 'danger.2';

export type ColorsFullRange =
	| 'white'
	| 'black'
	| ColorsPrimary
	| ColorsNeutral
	| ColorsAccents
	| ColorsSuccess
	| ColorsWarning
	| ColorsDanger;

export type BackgroundProps = Partial<{
	bg: ColorsFullRange;
}>;

export type ColorProps = Partial<{
	color: ColorsFullRange;
	fill: ColorsFullRange;
}>;

export type TypographyProps = Partial<{
	fontSize: ValuesFullRange;
	textAlign: 'left' | 'center' | 'right';
	fontWeight: 1 | 2 | 3;
	lineHeight: 1 | 2 | 3;
}>;

export type SpaceProps = Partial<{
	/** margin */
	m: ValuesFullRange;
	/** margin top */
	mt: ValuesFullRange;
	/** margin right */
	mr: ValuesFullRange;
	/** margin bottom */
	mb: ValuesFullRange;
	/** margin left */
	ml: ValuesFullRange;
	/** margin-top and margin-bottom */
	my: ValuesFullRange;
	/** margin-left and margin-right */
	mx: ValuesFullRange;
	/** padding */
	p: ValuesFullRange;
	/** padding top */
	pt: ValuesFullRange;
	/** padding right */
	pr: ValuesFullRange;
	/** padding bottom */
	pb: ValuesFullRange;
	/** padding left */
	pl: ValuesFullRange;
	/** padding-top and padding-bottom */
	py: ValuesFullRange;
	/** padding-left and padding-right */
	px: ValuesFullRange;
}>;

export type FlexBoxProps = {
	testId?: string;
	className?: string;
	cfg?: FlexProps &
		SpaceProps &
		BackgroundProps &
		ColorProps &
		LayoutProps &
		CursorProps &
		TypographyProps;
	[key: string]: any;
};
export const Flex: React.FC<FlexBoxProps> = ({
	className,
	children,
	cfg = {},
	testId,
	...props
}) => {
	const classNames = useClassNames(cfg, [styles.flex, className]);
	return createElement(
		'div',
		{
			className: classNames,
			'data-testid': testId,
			...props,
		},
		children,
	);
};
