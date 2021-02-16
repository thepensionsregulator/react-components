export type ReactRouterDomProps = {
	history: any;
	matchPath: any;
	location: any;
};

export type SidebarLinkProps = {
	name: string;
	/** route url path for react router, must match with Route path that is already declared */
	path: string;
	completed?: boolean;
	onClick?: (link: Omit<SidebarLinkProps, 'onClick'>) => void;
	disabled?: boolean;
	active?: (path: string) => boolean;
	links?: SidebarLinkProps[];
	hideIcon?: boolean;
};

export type SidebarSectionProps = {
	title: string;
	links: SidebarLinkProps[];
	order: number;
};

export type SidebarMenuProps = {
	title: string;
	links: SidebarLinkProps[];
	maintenanceMode: boolean;
	collapsed: boolean;
	sectionCompleteLabel: string;
	sectionIncompleteLabel: string;
};

export type StatusIconProps = {
	link: SidebarLinkProps;
	sectionCompleteLabel: string;
	sectionIncompleteLabel: string;
};
