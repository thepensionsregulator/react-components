import { TaskStatusIconProps } from 'components/tasklist';
import React from 'react';
import styles from '../tasklist.module.scss';

const TaskStatus: React.FC<TaskStatusIconProps> = ({
	link,
	sectionCompleteLabel,
	sectionIncompleteLabel,
}) => {
	return (
		<strong
			className={`${styles.taskStatus} ${
				link.completed ? styles.complete : styles.incomplete
			}`}
		>
			{link.completed ? sectionCompleteLabel : sectionIncompleteLabel}
		</strong>
	);
};

export default React.memo(TaskStatus);
