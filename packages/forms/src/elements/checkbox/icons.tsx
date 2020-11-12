import React from 'react';

export const CheckboxChecked: React.FC<any> = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="40"
			height="40"
			viewBox="0 0 40 40"
			className={className}
		>
			<g
				transform="translate(2 2)"
				fill="#f5f5f5"
				stroke="#585858"
				strokeWidth="4"
			>
				<rect width="40" height="40" stroke="none" fill="none" />
				<rect x="0.1" y="0.1" width="36" height="36" fill="none" />
			</g>
			<g transform="translate(11 10)">
				<path
					d="M3.648-.443l8.18,5.1L23.423-13.085"
					transform="translate(-3.648 13.085)"
					fill="none"
					stroke="#006ebc"
					strokeWidth="5"
				/>
			</g>
		</svg>
	);
};

export const CheckboxBlank: React.FC<any> = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="40"
			height="40"
			viewBox="0 0 40 40"
			className={className}
		>
			<g fill="#f5f5f5" stroke="#585858" strokeWidth="1">
				<rect width="40" height="40" stroke="none" />
				<rect x="0.5" y="0.5" width="39" height="39" fill="none" />
			</g>
		</svg>
	);
};
