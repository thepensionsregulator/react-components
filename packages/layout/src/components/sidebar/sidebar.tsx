import React, { useMemo } from 'react';
import { H3, Flex, Hr, Link, P } from '@tpr/core';
import { CheckedCircle, ErrorCircle } from '@tpr/icons';
import styles from './sidebar.module.scss';

function callAllEventHandlers(...fns: Function[]) {
	return (event: unknown, ...args: unknown[]) =>
		fns.some((fn) => fn && fn(event, ...args));
}

type ReactRouterDomProps = { history: any; matchPath: any; location: any };
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
				})),
			},
		];
	}, []);
};

export const isActive = (settings: { matchPath: any; location: any }) => (
	path: string,
): boolean => {
	const { matchPath = () => {}, location } = settings;
	const matched = matchPath(location.pathname, { path });
	return matched ? true : false;
};

type SidebarMenuProps = { title: string; links: SidebarLinkProps[] };
const SidebarMenu: React.FC<SidebarMenuProps> = ({ title, links }) => {
	return (
		<Flex cfg={{ flexDirection: 'column' }} className={styles.sidebarMenu}>
			<H3 cfg={{ fontWeight: 2, mt: 4 }}>{title}</H3>
			<Hr cfg={{ my: 4 }} />
			{links.map(
				({ onClick = () => {}, active = () => false, ...link }, key) => (
					<Flex key={key} cfg={{ justifyContent: 'space-between', mb: 5 }}>
						<Link
							cfg={{
								color: 'primary.2',
								textAlign: 'left',
								fontWeight: 3,
								width: 8,
							}}
							disabled={link.disabled}
							underline={active(link.path)}
							className={active(link.path) ? styles.activeLink : undefined}
							onClick={() => onClick(link)}
						>
							{link.name}
						</Link>
						{link.completed ? (
							<CheckedCircle cfg={{ fill: 'success.1' }} />
						) : (
							<ErrorCircle
								cfg={{ fill: link.disabled ? 'danger.1' : 'danger.2' }}
							/>
						)}
					</Flex>
				),
			)}
		</Flex>
	);
};

export type SidebarLinkProps = {
	name: string;
	/** route url path for react router, must match with Route path that is already declared */
	path: string;
	completed?: boolean;
	onClick?: (link: Omit<SidebarLinkProps, 'onClick'>) => void;
	disabled?: boolean;
	active?: (path: string) => boolean;
};

export type SidebarSectionProps = {
	title: string;
	links: SidebarLinkProps[];
	order: number;
};

export function useCalculateProgress(sections: SidebarSectionProps[]) {
	const totalSections = useMemo(
		() => sections.map((section) => section.links).flat(),
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
	sections: originalSections,
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
				<H3 cfg={{ fontWeight: 3, color: 'primary.2' }}>{title}</H3>
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
					<SidebarMenu key={key} title={item.title} links={item.links} />
				))}
		</div>
	);
};
