import React from 'react';
import { StatusIconProps } from './types';
import styles from '../tasklist.module.scss';

const TaskStatus: React.FC<StatusIconProps> = ({
	link,
	sectionCompleteLabel,
	sectionIncompleteLabel,
}) => {
	return (
		<span className={`${styles.taskStatus} ${(link.completed)? styles.complete : styles.incomplete}`}>
			{link.completed ? sectionCompleteLabel: sectionIncompleteLabel}
		</span>
	)
};

export default React.memo(TaskStatus);
