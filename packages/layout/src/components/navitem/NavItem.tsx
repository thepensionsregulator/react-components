import { Flex, Link } from '@tpr/core';
import React from 'react';
import { NavItemProps } from './types';
import navItemStyles from './navitem.module.scss';

export const NavItem: React.FC<NavItemProps> = ({ link, children }) => {
	return (
		<Link
			cfg={{
				color: 'primary.2',
				textAlign: 'left',
				fontWeight: 3,
			}}
			href={link.path}
			onClick={() => link.onClick(link)}
			taskList={true}
			className={
				link.hideIcon ? navItemStyles.link : navItemStyles.linkWithIcon
			}
		>
			<Flex
				cfg={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				{children}
			</Flex>
		</Link>
	);
};
