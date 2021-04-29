import React from 'react';
import { H2, Flex, Hr, Link } from '@tpr/core';
import { TasklistMenuProps } from './types';
import TaskStatus from './TaskStatus';
import styles from '../tasklist.module.scss';

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
				cfg={{ fontWeight: 3, mt: 4, color: 'neutral.8', lineHeight: 6 }}
				className={styles.styledAsH3}
			>
				{title}
			</H2>
			<Hr cfg={{ my: 4 }} />
			<ul className={styles.list}>
				{links.map(
					({ onClick = () => {}, active = () => false, ...link }, key) => (
						<li key={key}>
							<Flex
								cfg={{
									justifyContent: 'space-between',
									mb: 5,
									flexDirection: 'row',
								}}
								className={
									active(link.path, false)
										? `${styles.topLevelWrapper} ${styles.containsSelectedLink}`
										: styles.topLevelWrapper
								}
							>
								<Flex
									cfg={{
										justifyContent: 'space-between',
										width: 10,
										mb: 1,
									}}
									className={styles.topLevelLink}
									aria-current={active(link.path, true) ? 'page' : null}
								>
									<Link
										cfg={{
											color: 'primary.2',
											textAlign: 'left',
											fontWeight: 3,
											width: link.hideIcon ? 10 : 8,
										}}
										disabled={link.disabled}
										onClick={() => onClick(link)}
									>
										<Flex
											cfg={{
												flexDirection: 'row',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<span>{link.name}</span>
											{!maintenanceMode && !link.hideIcon && (
												<TaskStatus
													link={link}
													sectionCompleteLabel={sectionCompleteLabel}
													sectionIncompleteLabel={sectionIncompleteLabel}
												/>
											)}
										</Flex>
									</Link>
								</Flex>
							</Flex>
						</li>
					),
				)}
			</ul>
		</Flex>
	);
};

export default React.memo(TasklistMenu);
