import React from 'react';
import { useClassNames, SpaceProps, ColorProps } from '@tpr/core';

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

export const CheckboxChecked: React.FC<SVGProps> = (props) => {
	return (
		<SVG
			testId="checkbox-checked"
			width="40px"
			viewBox="351 1301 40 40"
			{...props}
		>
			<path
				d="M 354.5 1304.5  L 387.5 1304.5  L 387.5 1337.5  L 354.5 1337.5  L 354.5 1304.5  Z "
				fillRule="nonzero"
				fill="#f2f2f2"
				stroke="none"
			/>
			<path
				d="M 353 1303  L 389 1303  L 389 1339  L 353 1339  L 353 1303  Z "
				strokeWidth="4"
				stroke="#585858"
				fill="none"
			/>
			<path
				d="M 359.571428571429 1321  L 368.142857142857 1329.57142857143  "
				strokeWidth="8.57142857142857"
				stroke="#036db8"
				fill="none"
			/>
			<path
				d="M 368.142857142857 1329.57142857143  L 382.428571428571 1309.57142857143  "
				strokeWidth="8.57142857142857"
				stroke="#036db8"
				fill="none"
			/>
		</SVG>
	);
};

export const CheckboxBlank: React.FC<SVGProps> = (props) => {
	return (
		<SVG testId="checkbox-blank" width="40" viewBox="0 0 40 40" {...props}>
			<g fill="#f5f5f5" stroke="#585858" strokeWidth="1">
				<rect width="40" height="40" stroke="none" />
				<rect x="0.5" y="0.5" width="39" height="39" fill="none" />
			</g>
		</SVG>
	);
};

export const RadioButtonChecked: React.FC<SVGProps> = (props) => {
	return (
		<SVG width="40" viewBox="315 504 40 40" {...props}>
			<path
				d="M 335 507  C 344.52 507  352 514.48  352 524  C 352 533.52  344.52 541  335 541  C 325.48 541  318 533.52  318 524  C 318 514.48  325.48 507  335 507  Z "
				fillRule="nonzero"
				fill="#f2f2f2"
				stroke="none"
			/>
			<path
				d="M 335 506  C 345.08 506  353 513.92  353 524  C 353 534.08  345.08 542  335 542  C 324.92 542  317 534.08  317 524  C 317 513.92  324.92 506  335 506  Z "
				strokeWidth="4"
				stroke="#585858"
				fill="none"
			/>
			<path
				d="M 335 534  C 329.4 534  325 529.6  325 524  C 325 518.4  329.4 514  335 514  C 340.6 514  345 518.4  345 524  C 345 529.6  340.6 534  335 534  "
				fillRule="nonzero"
				fill="#036db8"
				stroke="none"
			/>
		</SVG>
	);
};

export const RadioButtonUnchecked: React.FC<SVGProps> = (props) => {
	return (
		<SVG width="40" viewBox="0 0 40 40" {...props}>
			<g fill="#f5f5f5" stroke="#585858" strokeWidth="1">
				<circle cx="20" cy="20" r="20" stroke="none" />
				<circle cx="20" cy="20" r="19.5" fill="none" />
			</g>
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
		<SVG testId="checked-circle" width="22" viewBox="0 0 22 22" {...props}>
			<circle cx="11" cy="11" r="11" />
			<g transform="translate(5.665 5.915)">
				<path
					d="M3.648-6.692,7.785-4.11l5.863-8.975"
					transform="translate(-3.648 13.085)"
					fill="none"
					stroke="#fff"
					strokeWidth="3"
				/>
			</g>
		</SVG>
	);
};

export const ErrorCircle: React.FC<SVGProps> = (props) => {
	return (
		<SVG testId="error-circle" width="22" viewBox="0 0 22 22" {...props}>
			<path
				d="M241.259,11476.006a11,11,0,1,0,11,11A11,11,0,0,0,241.259,11476.006Zm1.181,17.4a1.6,1.6,0,0,1-1.172.416,1.642,1.642,0,0,1-1.19-.408,1.81,1.81,0,0,1-.009-2.311,1.671,1.671,0,0,1,1.2-.4,1.624,1.624,0,0,1,1.177.4,1.78,1.78,0,0,1,0,2.294Zm-.046-4.778h-2.234l-.467-8.439h3.168Z"
				transform="translate(-230.259 -11476.006)"
			/>
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

export type CrossProps = {
	svgProps?: SVGProps;
	colour?: 'white' | 'black';
};

export const Cross: React.FC<CrossProps> = ({ svgProps, colour }) => {
	const strokeColour = colour || 'black';

	return (
		<SVG testId="cross" {...svgProps} width="20px">
			<line
				x1="2"
				x2="20"
				y1="2"
				y2="20"
				stroke={strokeColour}
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<line
				x1="2"
				x2="20"
				y1="20"
				y2="2"
				stroke={strokeColour}
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</SVG>
	);
};
