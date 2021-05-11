import React, { useMemo } from 'react';
import { Flex, Link, P, flatten } from '@tpr/core';
import { callAllEventHandlers } from '../../utils';
import TasklistMenu from './components/TasklistMenu';
import { TasklistProps, TasklistSectionProps } from './components/types';
import styles from './tasklist.module.scss';
import { ReactRouterDomProps } from 'components/types/types';

export const isActive = (settings: { matchPath: any; location: any }) => (
	path: string,
	exact: boolean,
): boolean => {
	const { matchPath = () => {}, location } = settings;
	return matchPath(location.pathname, { path, exact });
};

export const useSectionsUpdater = (
	sections: TasklistSectionProps[],
	{ history, matchPath, location }: ReactRouterDomProps,
): TasklistSectionProps[] => {
	return sections.reduce<TasklistSectionProps[]>((accumulator, section) => {
		return [
			...accumulator,
			{
				...section,
				links: section.links.map((link) => ({
					...link,
					onClick: callAllEventHandlers(
						({ path }) => history.push(path),
						link.onClick,
					),
					active: isActive({ matchPath, location }),
				})),
			},
		];
	}, []);
};

export function useCalculateProgress(sections: TasklistSectionProps[]) {
	const allSections = useMemo(
		() => flatten(sections.map((section) => section.links)),
		[sections],
	);
	const allCompleted = useMemo(
		() => allSections.filter((section) => section.completed),
		[allSections],
	);

	return [allSections, allCompleted];
}

export const Tasklist: React.FC<TasklistProps> = ({
	titleComplete,
	titleIncomplete,
	reviewTitle,
	reviewPath,
	welcomeTitle,
	welcomePath,
	sections: originalSections,
	maintenanceMode = false,
	matchPath,
	location,
	history,
	sectionCompleteLabel,
	sectionIncompleteLabel,
	testId,
}) => {
	const routerProps = { matchPath, location, history };
	const sections = useSectionsUpdater(originalSections, routerProps);
	const [allSections, allCompleted] = useCalculateProgress(sections);
	const completed: boolean = allSections.length == allCompleted.length;

	return (
		<nav className={styles.tasklist} data-testid={testId}>
			<Flex
				cfg={{ flexDirection: 'column', mt: 8 }}
				className={styles.tasklistMenu}
			>
				<P
					cfg={{
						color: 'neutral.8',
						fontSize: 4,
						fontWeight: 3,
						lineHeight: 6,
					}}
					className={styles.label}
				>
					{completed ? titleComplete : titleIncomplete}
				</P>
				<P
					cfg={{
						color: 'neutral.8',
						fontSize: 3,
						fontWeight: 3,
						lineHeight: 6,
					}}
					className={styles.label}
				>
					{`You have completed ${allCompleted.length} of ${allSections.length} sections`}
				</P>
				<Flex cfg={{ flexDirection: 'column', mt: 4 }}>
					<Link
						cfg={{
							fontWeight: 3,
							color: 'primary.2',
							textAlign: 'left',
							lineHeight: 6,
							fontSize: 2,
						}}
						href={reviewPath}
					>
						{reviewTitle}
					</Link>
					<Link
						cfg={{
							fontWeight: 3,
							color: 'primary.2',
							textAlign: 'left',
							lineHeight: 6,
							fontSize: 2,
						}}
						href={welcomePath}
					>
						{welcomeTitle}
					</Link>
				</Flex>
			</Flex>
			<ul className={styles.list}>
				{sections
					.sort((a, b) => a.order - b.order)
					.map((item, key) => (
						<li key={key}>
							<TasklistMenu
								title={item.title}
								links={item.links}
								maintenanceMode={maintenanceMode}
								sectionCompleteLabel={sectionCompleteLabel}
								sectionIncompleteLabel={sectionIncompleteLabel}
							/>
						</li>
					))}
			</ul>
		</nav>
	);
};
