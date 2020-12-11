import React from 'react';
import { SpaceProps, ColorProps } from '../globals/globals';
import { useClassNames } from '../../hooks/use-class-names';

type SVGProps = Partial<{
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
}>;

export const SVG: React.FC<SVGProps> = ({
	cfg,
	fill = '',
	stroke = '',
	width = '24',
	className,
	viewBox = '0 0 24 24',
	testId,
	role,
	ariaLabel,
	children,
}) => {
	const classNames = useClassNames(cfg, [className]);
	return (
		<svg
			width={width}
			height={width}
			fill={fill}
			stroke={stroke}
			viewBox={viewBox}
			xmlns="http://www.w3.org/2000/svg"
			className={classNames}
			xmlnsXlink="http://www.w3.org/1999/xlink"
			data-testid={testId}
			role={role}
			aria-label={ariaLabel}
		>
			{children}
		</svg>
	);
};

export const ArrowRight: React.FC<SVGProps> = (props) => {
	return (
		<SVG testId="arrow-down" {...props}>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
		</SVG>
	);
};