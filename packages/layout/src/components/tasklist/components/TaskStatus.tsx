import React from 'react';
import { CheckedCircle, ErrorCircle } from '@tpr/icons';
import { StatusIconProps } from './types';

const TaskStatus: React.FC<StatusIconProps> = ({
	link,
	sectionCompleteLabel,
	sectionIncompleteLabel,
}) => {
	return link.completed ? (
		<div>Completed</div>
	) : (
		<ErrorCircle
			cfg={{ fill: link.disabled ? 'danger.1' : 'danger.2' }}
			ariaLabel={sectionIncompleteLabel}
		/>
	);
};

export default React.memo(TaskStatus);
