import React from 'react';
import { H3, Flex, Hr, Link } from '@tpr/core';
import { SidebarMenuProps } from './types';
import StatusIcon from './StatusIcon';
import styles from '../sidebar.module.scss';

const SidebarMenu: React.FC<SidebarMenuProps> = ({
	title,
	links,
	maintenanceMode,
}) => {
	return (
		<Flex cfg={{ flexDirection: 'column' }} className={styles.sidebarMenu}>
			<H3 cfg={{ fontWeight: 2, mt: 4 }}>{title}</H3>
			<Hr cfg={{ my: 4 }} />
			{links.map(
				({ onClick = () => {}, active = () => false, ...link }, key) => (
					<Flex key={key} cfg={{ justifyContent: 'space-between', mb: 5 }}>
						<Link
							cfg={{
								color: 'primary.2',
								textAlign: 'left',
								fontWeight: 3,
								width: 8,
							}}
							disabled={link.disabled}
							underline={active(link.path)}
							className={active(link.path) ? styles.activeLink : undefined}
							onClick={() => onClick(link)}
						>
							{link.name}
						</Link>
						{!maintenanceMode && <StatusIcon link={link} />}
					</Flex>
				),
			)}
		</Flex>
	);
};

export default React.memo(SidebarMenu);