import React, { useMemo } from 'react';
import { Flex, Link, P, flatten } from '@tpr/core';
import { callAllEventHandlers } from '../../utils';
import styles from './sidebar.module.scss';
import SidebarMenu from './components/SidebarMenu';
import { ReactRouterDomProps, SidebarSectionProps } from './components/types';


export const isActive = (settings: { matchPath: any; location: any }) => (
	path: string,
): boolean => {
	const { matchPath = () => {}, location } = settings;
	console.log("location.pathname", location.pathname);
	const matched = matchPath(location.pathname, { path });
	return matched ? true : false;
};

export const useSectionsUpdater = (
	sections: SidebarSectionProps[],
	{ history, matchPath, location }: ReactRouterDomProps,
): SidebarSectionProps[] => {
	//console.log("location", location);
	return sections.reduce<SidebarSectionProps[]>((accumulator, section) => {
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

export function useCalculateProgress(sections: SidebarSectionProps[]) {
	const totalSections = useMemo(
		() => flatten(sections.map((section) => section.links)),
		[sections],
	);
	const totalCompleted = useMemo(
		() => totalSections.filter((section) => section.completed),
		[totalSections],
	);

	return [totalSections, totalCompleted];
}

export type SidebarProps = {
	title: string;
	titlePath?: string;
	maintenanceMode?: boolean;
	sections: SidebarSectionProps[];
	/** import from react-router-dom */
	matchPath: any;
	/** import from react-router-dom */
	location: any;
	/** import from react-router-dom */
	history: any;
};

export const Sidebar: React.FC<SidebarProps> = ({
	title,
	titlePath,
	sections: originalSections,
	maintenanceMode = false,
	matchPath,
	location,
	history,
}) => {
	const routerProps = { matchPath, location, history };
	const sections = useSectionsUpdater(originalSections, routerProps);
	const [totalSections, totalCompleted] = useCalculateProgress(sections);

	return (
		<div className={styles.sidebar}>
			<Flex
				cfg={{ flexDirection: 'column', mt: 4 }}
				className={styles.sidebarMenu}
			>
				<Link
					cfg={{
						fontWeight: 3,
						color: 'primary.2',
						textAlign: 'left',
						fontSize: 4,
					}}
					onClick={() => history.push(titlePath)}
				>
					{title}
				</Link>
				<Flex cfg={{ justifyContent: 'space-between', mt: 4, mb: 2 }}>
					<P>Section</P>
					<P>
						Progress {totalCompleted.length} / {totalSections.length}
					</P>
				</Flex>
			</Flex>
			{sections
				.sort((a, b) => a.order - b.order)
				.map((item, key) => (
					<SidebarMenu
						key={key}
						title={item.title}
						links={item.links}
						maintenanceMode={maintenanceMode}
					/>
				))}
		</div>
	);
};
