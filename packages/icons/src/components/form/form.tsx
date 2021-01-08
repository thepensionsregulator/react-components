import React from 'react';
import { SVGProps } from '../types';
import { SVG } from '../global';

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
