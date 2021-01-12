import React from 'react';
import { CrossProps } from '../types';
import { SVG } from '../global';

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
