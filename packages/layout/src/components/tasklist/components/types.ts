export type TasklistLinkProps = {
	name: string;
	/** route url path for react router, must match with Route path that is already declared */
	path: string;
	completed?: boolean;
	onClick?: (link: Omit<TasklistLinkProps, 'onClick'>) => void;
	disabled?: boolean;
	active?: (path: string, exact: boolean) => boolean;
	hideIcon?: boolean;
};

export type TasklistSectionProps = {
	title: string;
	links: TasklistLinkProps[];
	order: number;
};

export type TasklistMenuProps = {
	title: string;
	links: TasklistLinkProps[];
	maintenanceMode: boolean;
	sectionCompleteLabel: string;
	sectionIncompleteLabel: string;
};

export type TaskStatusIconProps = {
	link: TasklistLinkProps;
	sectionCompleteLabel: string;
	sectionIncompleteLabel: string;
};
