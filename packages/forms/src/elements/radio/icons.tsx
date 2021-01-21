import React from 'react';

export const RadioButtonChecked: React.FC<any> = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="40"
			height="40"
			viewBox="0 0 40 40"
			className={className}
			focusable="false"
		>
			<g
				transform="translate(0.5 0.5)"
				fill="#f5f5f5"
				stroke="#585858"
				strokeWidth="4"
			>
				<circle cx="19.6" cy="19.6" r="20" stroke="none" />
				<circle cx="19.6" cy="19.6" r="18" fill="none" />
			</g>
			<circle
				cx="10"
				cy="10"
				r="10"
				transform="translate(10.3 10.3)"
				fill="#006ebc"
			/>
		</svg>
	);
};

export const RadioButtonUnchecked: React.FC<any> = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="40"
			height="40"
			viewBox="0 0 40 40"
			className={className}
			focusable="false"
		>
			<g fill="#f5f5f5" stroke="#585858" strokeWidth="1">
				<circle cx="20" cy="20" r="20" stroke="none" />
				<circle cx="20" cy="20" r="19.5" fill="none" />
			</g>
		</svg>
	);
};
