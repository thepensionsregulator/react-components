import React, { memo } from 'react';
import { H3, Flex, Hr, Link, P } from '@tpr/core';
import { CheckedCircle, ErrorCircle } from '@tpr/icons';
import styles from './sidebar.module.scss';
import { isEqual } from 'lodash';

// react router Link isActive
// const isActive = !!(isActiveProp ? isActiveProp(match, currentLocation) : match);
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/NavLink.js

// NOTE: if decided to keep track of the progress in the browser with no API relation
// we'll need to create app context for the status of the completion
// but need to keep in mind that the completion status will only be valid on that same browser
// as it will be stored in the localStorage.

// NOTE: active status vertical line is fixed height at 42px and is ok for single lined links
// but on double line links it looks too shourt. This one is for Jodi I guess...

type SidebarMenuProps = { title: string; links: SidebarLinkProps[] };
const SidebarMenu: React.FC<SidebarMenuProps> = ({ title, links }) => {
	return (
		<Flex cfg={{ flexDirection: 'column' }} className={styles.sidebarMenu}>
			<H3 cfg={{ fontWeight: 2, mt: 4 }}>{title}</H3>
			<Hr cfg={{ my: 4 }} />
			{links.map(({ onClick = () => {}, ...link }, key) => (
				<Flex key={key} cfg={{ justifyContent: 'space-between', mb: 4 }}>
					<Link
						cfg={{
							color: 'primary.2',
							textAlign: 'left',
							fontWeight: 3,
							width: 8,
						}}
						disabled={link.disabled}
						underline={link.active}
						className={link.active ? styles.activeLink : undefined}
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
			))}
		</Flex>
	);
};

export type SidebarLinkProps = {
	name: string;
	completed?: boolean;
	onClick?: (link: Omit<SidebarLinkProps, 'onClick'>) => void;
	disabled?: boolean;
	active?: boolean;
};

export type SidebarSectionProps = {
	title: string;
	links: SidebarLinkProps[];
	order: number;
};

export type SidebarProps = {
	title: string;
	sections: SidebarSectionProps[];
};

export const Sidebar: React.FC<SidebarProps> = memo(
	({ title, sections }) => {
		const totalSections = sections.map((section) => section.links).flat();
		const totalCompleted = totalSections.filter((section) => section.completed);

		return (
			<div className={styles.sidebar}>
				<Flex cfg={{ flexDirection: 'column' }} className={styles.sidebarMenu}>
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
	},
	(a, b) => isEqual(a.sections, b.sections),
);
