import { NavItemLinkProps } from '../../navitem';

export type TasklistSectionProps = {
	title: string;
	links: NavItemLinkProps[];
	order: number;
};

export type TasklistMenuProps = {
	title: string;
	links: NavItemLinkProps[];
	showStatus: boolean;
	sectionDisabledLabel: string;
	sectionCompleteLabel: string;
	sectionIncompleteLabel: string;
};

export type TaskStatusIconProps = {
	link: NavItemLinkProps;
	sectionDisabledLabel: string;
	sectionCompleteLabel: string;
	sectionIncompleteLabel: string;
};

export type TasklistProps = {
	titleComplete?: string;
	titleIncomplete?: string;
	reviewTitle: string;
	reviewPath: string;
	showStatus?: boolean;
	sections: TasklistSectionProps[];
	/** import from react-router-dom */
	matchPath: any;
	/** import from react-router-dom */
	location: any;
	/** import from react-router-dom */
	history: any;
	sectionDisabledLabel: string;
	sectionCompleteLabel: string;
	sectionIncompleteLabel: string;
	testId?: string;
};
