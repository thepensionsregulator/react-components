import React from 'react';
import { ColorProps } from '@tpr/core';
import { ArrowLeft, ArrowUp, ArrowRight, ArrowDown } from '@tpr/icons';

// TODO: update icon colors from the theming variables once ready.

export type ArrowIconProps = {
	pointsTo: 'left' | 'up' | 'right' | 'down';
	size?: string;
	fill?: ColorProps['fill'];
};
export const ArrowIcon: React.FC<ArrowIconProps> = ({
	pointsTo,
	size,
	fill = 'primary.3',
}) => {
	switch (pointsTo) {
		case 'left':
			return <ArrowLeft cfg={{ fill }} width={size} />;
		case 'up':
			return <ArrowUp cfg={{ fill }} width={size} />;
		case 'right':
			return <ArrowRight cfg={{ fill }} width={size} />;
		case 'down':
			return <ArrowDown cfg={{ fill }} width={size} />;
		default:
			return <ArrowLeft cfg={{ fill }} width={size} />;
	}
};
