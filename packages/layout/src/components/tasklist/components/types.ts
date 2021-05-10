import { NavItemLinkProps } from 'components/navitem/types';

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

export type TasklistProps = {
	title: string;
	reviewPath?: string;
	welcomePath?: string;
	maintenanceMode?: boolean;
	sections: TasklistSectionProps[];
	/** import from react-router-dom */
	matchPath: any;
	/** import from react-router-dom */
	location: any;
	/** import from react-router-dom */
	history: any;
	sectionCompleteLabel: string;
	sectionIncompleteLabel: string;
};