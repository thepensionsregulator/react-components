import React from 'react';
import { useClassNames, SpaceProps } from '@tpr/core';

type SVGProps = Partial<{
	/** space props */
	cfg: SpaceProps;
	/** svg fill colour */
	fill: string;
	/** width and height of the icon */
	width: string;
	/** svg class name */
	className: string;
	/** svg viewBox */
	viewBox: string;
	/** test id for testing */
	testId: string;
}>;

export const SVG: React.FC<SVGProps> = ({
	cfg,
	fill = '#000',
	width = '24',
	className,
	viewBox = '0 0 24 24',
	testId,
	children,
}) => {
	const classNames = useClassNames(cfg, [className]);
	return (
		<svg
			width={width}
			height={width}
			fill={fill}
			viewBox={viewBox}
			xmlns="http://www.w3.org/2000/svg"
			className={classNames}
			xmlnsXlink="http://www.w3.org/1999/xlink"
			data-testid={`icon-${testId}`}
		>
			{children}
		</svg>
	);
};

export const CheckboxChecked: React.FC<SVGProps> = (props) => {
	return (
		<SVG testId="checkbox-checked" {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
		</SVG>
	);
};

export const CheckboxBlank: React.FC<SVGProps> = (props) => {
	return (
		<SVG testId="checkbox-blank" {...props}>
			<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
			<path d="M0 0h24v24H0z" fill="none" />
		</SVG>
	);
};

export const RadioButtonChecked: React.FC<SVGProps> = (props) => {
	return (
		<SVG testId="radio-button-checked" {...props}>
			<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
			<path d="M0 0h24v24H0z" fill="none" />
		</SVG>
	);
};

export const RadioButtonUnchecked: React.FC<SVGProps> = (props) => {
	return (
		<SVG testId="radio-button-unchecked" {...props}>
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
			<path d="M0 0h24v24H0z" fill="none" />
		</SVG>
	);
};

export const UnfoldMore: React.FC<SVGProps> = (props) => {
	return (
		<SVG testId="unfold-more" {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z" />
		</SVG>
	);
};

export const CheckedCircle: React.FC<SVGProps> = (props) => {
	return (
		<SVG testId="checked-circle" {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
		</SVG>
	);
};

export const ErrorCircle: React.FC<SVGProps> = (props) => {
	return (
		<SVG testId="error-circle" {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
		</SVG>
	);
};

export const ArrowUp: React.FC<SVGProps> = (props) => {
	return (
		<SVG testId="arrow-up" {...props}>
			<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
			<path d="M0 0h24v24H0z" fill="none" />
		</SVG>
	);
};

export const ArrowDown: React.FC<SVGProps> = (props) => {
	return (
		<SVG testId="arrow-down" {...props}>
			<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
			<path d="M0 0h24v24H0V0z" fill="none" />
		</SVG>
	);
};

export const ArrowLeft: React.FC<SVGProps> = (props) => {
	return (
		<SVG testId="arrow-up" {...props}>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
		</SVG>
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
