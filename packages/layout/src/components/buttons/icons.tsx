import React from 'react';
import { ArrowLeft, ArrowUp, ArrowRight, ArrowDown } from '@tpr/icons';

export type ArrowIconProps = {
	pointsTo: 'left' | 'up' | 'right' | 'down';
	size?: string;
	fill?: string;
};
export const ArrowIcon: React.FC<ArrowIconProps> = ({
	pointsTo,
	fill = 'blue',
	size,
}) => {
	switch (pointsTo) {
		case 'left':
			return <ArrowLeft fill={fill} width={size} />;
		case 'up':
			return <ArrowUp fill={fill} width={size} />;
		case 'right':
			return <ArrowRight fill={fill} width={size} />;
		case 'down':
			return <ArrowDown fill={fill} width={size} />;
		default:
			return <ArrowLeft fill={fill} width={size} />;
	}
};
