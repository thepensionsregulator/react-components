import { NavItemLinkProps } from 'components/navitem/types';

export type SidebarSectionProps = {
	title: string;
	links: NavItemLinkProps[];
	order: number;
};

export type SidebarMenuProps = {
	title: string;
	links: NavItemLinkProps[];
	maintenanceMode: boolean;
	collapsed: boolean;
	sectionCompleteLabel: string;
	sectionIncompleteLabel: string;
};

export type StatusIconProps = {
	link: NavItemLinkProps;
	sectionCompleteLabel: string;
	sectionIncompleteLabel: string;
};
