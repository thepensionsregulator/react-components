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
				stroke-width="4"
				stroke="#585858"
				fill="none"
			/>
			<path
				d="M 359.571428571429 1321  L 368.142857142857 1329.57142857143  "
				stroke-width="8.57142857142857"
				stroke="#036db8"
				fill="none"
			/>
			<path
				d="M 368.142857142857 1329.57142857143  L 382.428571428571 1309.57142857143  "
				stroke-width="8.57142857142857"
				stroke="#036db8"
				fill="none"
			/>
		</SVG>
	);
};

export const CheckboxBlank: React.FC<SVGProps> = (props) => {
	return (
		<SVG
			testId="checkbox-blank"
			width="40px"
			viewBox="351 1301 40 40"
			{...props}
		>
			<path
				d="M 351.5 1301.5  L 390.5 1301.5  L 390.5 1340.5  L 351.5 1340.5  L 351.5 1301.5  Z "
				fillRule="nonzero"
				fill="#f2f2f2"
				stroke="none"
			/>
			<path
				d="M 351.5 1301.5  L 390.5 1301.5  L 390.5 1340.5  L 351.5 1340.5  L 351.5 1301.5  Z "
				stroke-width="1"
				stroke="#585858"
				fill="none"
			/>
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
				stroke-width="4"
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
		<SVG width="40" viewBox="315 504 40 40" {...props}>
			<path
				d="M 335 504  C 346.2 504  355 512.8  355 524  C 355 535.2  346.2 544  335 544  C 323.8 544  315 535.2  315 524  C 315 512.8  323.8 504  335 504  Z "
				fillRule="nonzero"
				fill="#f2f2f2"
				stroke="none"
			/>
			<path
				d="M 335 504.5  C 345.92 504.5  354.5 513.08  354.5 524  C 354.5 534.92  345.92 543.5  335 543.5  C 324.08 543.5  315.5 534.92  315.5 524  C 315.5 513.08  324.08 504.5  335 504.5  Z "
				stroke-width="1"
				stroke="#585858"
				fill="none"
			/>
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
