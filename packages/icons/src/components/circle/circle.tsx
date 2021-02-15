import React from 'react';
import { SVGProps } from '../types';
import { SVG } from '../global';

export const CheckedCircle: React.FC<SVGProps> = (props) => {
	return (
		<SVG
			testId="checked-circle"
			width="22"
			viewBox="0 0 22 22"
			role="img"
			{...props}
		>
			<title>{props.ariaLabel}</title>
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
		<SVG
			testId="error-circle"
			width="22"
			viewBox="0 0 22 22"
			role="img"
			{...props}
		>
			<title>{props.ariaLabel}</title>
			<path
				d="M241.259,11476.006a11,11,0,1,0,11,11A11,11,0,0,0,241.259,11476.006Zm1.181,17.4a1.6,1.6,0,0,1-1.172.416,1.642,1.642,0,0,1-1.19-.408,1.81,1.81,0,0,1-.009-2.311,1.671,1.671,0,0,1,1.2-.4,1.624,1.624,0,0,1,1.177.4,1.78,1.78,0,0,1,0,2.294Zm-.046-4.778h-2.234l-.467-8.439h3.168Z"
				transform="translate(-230.259 -11476.006)"
			/>
		</SVG>
	);
};
