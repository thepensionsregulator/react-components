import React, { useEffect, useMemo, useState } from 'react';
import { Flex, Link, P, flatten } from '@tpr/core';
import { callAllEventHandlers } from '../../utils';
import SidebarMenu from './components/SidebarMenu';
import { SidebarSectionProps } from './components/types';
import { ReactRouterDomProps } from '../types/types';
import styles from './sidebar.module.scss';

export const isActive = (settings: { matchPath: any; location: any }) => (
	path: string,
	exact: boolean,
): boolean => {
	const { matchPath = () => {}, location } = settings;
	return matchPath(location.pathname, { path, exact });
};

export const useSectionsUpdater = (
	sections: SidebarSectionProps[],
	{ history, matchPath, location }: ReactRouterDomProps,
): SidebarSectionProps[] => {
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
					links:
						link.links &&
						link.links.map((innerLink) => ({
							...innerLink,
							onClick: callAllEventHandlers(
								({ path }) => history.push(path),
								innerLink.onClick,
							),
							active: isActive({ matchPath, location }),
						})),
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
	collapseNested?: boolean;
	sectionCompleteLabel: string;
	sectionIncompleteLabel: string;
};

export const Sidebar: React.FC<SidebarProps> = ({
	title,
	titlePath,
	sections: originalSections,
	maintenanceMode = false,
	matchPath,
	location,
	history,
	collapseNested = false,
	sectionCompleteLabel,
	sectionIncompleteLabel,
}) => {
	const routerProps = { matchPath, location, history };
	const sections = useSectionsUpdater(originalSections, routerProps);
	const [totalSections, totalCompleted] = useCalculateProgress(sections);
	const [isHomePageActive, setIsHomePageActive] = useState(false);

	useEffect(() => {
		const match = matchPath(location.pathname, {
			path: titlePath,
			exact: true,
		});
		setIsHomePageActive(match);
	}, [location.pathname]);

	return (
		<nav className={styles.sidebar}>
			<Flex
				cfg={{ flexDirection: 'column', mt: 8 }}
				className={styles.sidebarMenu}
			>
				<Flex className={isHomePageActive ? styles.activeLink : ''}>
					<Link
						cfg={{
							fontWeight: 3,
							color: 'primary.2',
							textAlign: 'left',
							lineHeight: 6,
							fontSize: 4,
						}}
						onClick={() => history.push(titlePath)}
					>
						{title}
					</Link>
				</Flex>
				<Flex cfg={{ justifyContent: 'space-between', mt: 4, mb: 2 }}>
					<P
						cfg={{
							color: 'neutral.8',
							fontSize: 3,
							fontWeight: 3,
							lineHeight: 6,
						}}
						className={styles.label}
					>
						Section
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
						Progress {totalCompleted.length} / {totalSections.length}
					</P>
				</Flex>
			</Flex>
			<ul className={styles.list}>
				{sections
					.sort((a, b) => a.order - b.order)
					.map((item, key) => (
						<li key={key}>
							<SidebarMenu
								title={item.title}
								links={item.links}
								maintenanceMode={maintenanceMode}
								collapsed={collapseNested}
								sectionCompleteLabel={sectionCompleteLabel}
								sectionIncompleteLabel={sectionIncompleteLabel}
							/>
						</li>
					))}
			</ul>
		</nav>
	);
};
