import { Flex, Link } from '@tpr/core';
import React from 'react';
import { NavItemProps } from './types';

export const NavItem: React.FC<NavItemProps> = ({ link, children }) => {
	return (
		<Link
			cfg={{
				color: 'primary.2',
				textAlign: 'left',
				fontWeight: 3,
				width: link.hideIcon ? 10 : 8,
			}}
			disabled={link.disabled}
			href={link.path}
			onClick={() => link.onClick(link)}
			taskList={true}
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
