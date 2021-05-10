import { NavItemLinkProps } from 'components/navitem/navitem';

export type TasklistSectionProps = {
	title: string;
	links: NavItemLinkProps[];
	order: number;
};

export type TasklistMenuProps = {
	title: string;
	links: NavItemLinkProps[];
	maintenanceMode: boolean;
	sectionCompleteLabel: string;
	sectionIncompleteLabel: string;
};

export type TaskStatusIconProps = {
	link: NavItemLinkProps;
	sectionCompleteLabel: string;
	sectionIncompleteLabel: string;
};
