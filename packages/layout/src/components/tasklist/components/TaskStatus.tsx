import React from 'react';
import { TaskStatusIconProps } from './types';
import styles from '../tasklist.module.scss';

const TaskStatus: React.FC<TaskStatusIconProps> = ({
	link,
	sectionDisabledLabel,
	sectionCompleteLabel,
	sectionIncompleteLabel,
}) => {
	let label: string, className: string;
	if (link.completed) {
		label = sectionCompleteLabel;
		className = styles.complete;
	} else if (link.disabled) {
		label = sectionDisabledLabel;
		className = styles.disabled;
	} else {
		label = sectionIncompleteLabel;
		className = styles.incomplete;
	}
	return (
		<strong className={`${styles.taskStatus} ${className}`}>{label}</strong>
	);
};

export default React.memo(TaskStatus);
