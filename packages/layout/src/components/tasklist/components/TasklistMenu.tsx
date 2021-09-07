import React from 'react';
import { H2, Flex, Hr } from '@tpr/core';
import { TasklistMenuProps } from './types';
import TaskStatus from './TaskStatus';
import styles from '../tasklist.module.scss';
import { NavItem } from '../../../components/navitem/navitem';

const TasklistMenu: React.FC<TasklistMenuProps> = ({
	title,
	links,
	showStatus,
	sectionDisabledLabel,
	sectionCompleteLabel,
	sectionIncompleteLabel,
}) => {
	return (
		<Flex cfg={{ flexDirection: 'column' }} className={styles.tasklistMenu}>
			<H2
				cfg={{ fontWeight: 3, mt: 5, color: 'neutral.8', lineHeight: 6 }}
				className={styles.styledAsH3}
			>
				{title}
			</H2>
			<Hr />
			<ul className={styles.list}>
				{links.map(({ active, ...link }, key) => (
					<li key={key}>
						<Flex
							cfg={{
								justifyContent: 'space-between',
								my: 1,
								flexDirection: 'row',
							}}
							className={styles.taskWrapper}
						>
							<Flex
								cfg={{
									justifyContent: 'space-between',
									width: 10,
								}}
							>
								{link.disabled ? (
									<div className={styles.taskDisabled}>
										<span className={styles.taskName}>{link.name}</span>
										{showStatus && !link.hideIcon && (
											<TaskStatus
												link={link}
												sectionDisabledLabel={sectionDisabledLabel}
												sectionCompleteLabel={sectionCompleteLabel}
												sectionIncompleteLabel={sectionIncompleteLabel}
											/>
										)}
									</div>
								) : (
									<NavItem link={link}>
										<span className={styles.taskName}>{link.name}</span>
										{showStatus && !link.hideIcon && (
											<TaskStatus
												link={link}
												sectionDisabledLabel={sectionDisabledLabel}
												sectionCompleteLabel={sectionCompleteLabel}
												sectionIncompleteLabel={sectionIncompleteLabel}
											/>
										)}
									</NavItem>
								)}
							</Flex>
						</Flex>
						<Hr />
					</li>
				))}
			</ul>
		</Flex>
	);
};

export default React.memo(TasklistMenu);
