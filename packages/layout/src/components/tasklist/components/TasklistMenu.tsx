import React from 'react';
import { H2, Flex, Hr } from '@tpr/core';
import { TasklistMenuProps } from './types';
import TaskStatus from './TaskStatus';
import styles from '../tasklist.module.scss';
import { NavItem } from '../../../components/navitem/navitem';

const TasklistMenu: React.FC<TasklistMenuProps> = ({
	title,
	links,
	maintenanceMode,
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
								aria-current={active(link.path, true) ? 'page' : null}
							>
								<NavItem link={link}>
									<span>{link.name}</span>
									{!maintenanceMode && !link.hideIcon && (
										<TaskStatus
											link={link}
											sectionCompleteLabel={sectionCompleteLabel}
											sectionIncompleteLabel={sectionIncompleteLabel}
										/>
									)}
								</NavItem>
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
