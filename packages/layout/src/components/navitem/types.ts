import { ReactNode } from 'react';

export type NavItemProps = {
	link: NavItemLinkProps;
	children?: ReactNode;
};

export type NavItemLinkProps = {
	name: string;
	/** route url path for react router, must match with Route path that is already declared */
	path: string;
	completed?: boolean;
	onClick?: (link: Omit<NavItemLinkProps, 'onClick'>) => void;
	disabled?: boolean;
	active?: (path: string, exact: boolean) => boolean;
	links?: NavItemLinkProps[];
	hideIcon?: boolean;
};
