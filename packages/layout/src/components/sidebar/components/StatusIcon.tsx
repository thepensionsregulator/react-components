import React from 'react';
import { CheckedCircle, ErrorCircle } from '@tpr/icons';
import { StatusIconProps } from './types';

const StatusIcon: React.FC<StatusIconProps> = ({
	link,
	sectionCompleteLabel,
	sectionIncompleteLabel,
}) => {
	return link.completed ? (
		<CheckedCircle
			cfg={{ fill: 'success.1' }}
			alternativeText={sectionCompleteLabel}
		/>
	) : (
		<ErrorCircle
			cfg={{ fill: link.disabled ? 'danger.1' : 'danger.2' }}
			alternativeText={sectionIncompleteLabel}
		/>
	);
};

export default React.memo(StatusIcon);
