import { SpaceProps, ColorProps } from '@tpr/core';

export type SVGProps = Partial<{
	/** space props */
	cfg: SpaceProps | ColorProps;
	/** svg fill colour */
	fill: string;
	/** svg stroke colour */
	stroke: string;
	/** width and height of the icon */
	width: string;
	/** svg class name */
	className: string;
	/** svg viewBox */
	viewBox: string;
	/** test id for testing */
	testId: string;
	/** for accessibility */
	role: string;
	ariaLabel: string;
	focusable?: boolean;
}>;

export type CrossProps = {
	svgProps?: SVGProps;
	colour?: 'white' | 'black';
};

export type SpinnerProps = {
	text?: string;
	iconOnly?: boolean;
};
