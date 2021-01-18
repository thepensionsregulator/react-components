import React, { useState, useEffect } from 'react';
import { H3, Flex, Hr, Link } from '@tpr/core';
import { SidebarLinkProps, SidebarMenuProps } from './types';
import StatusIcon from './StatusIcon';
import styles from '../sidebar.module.scss';

const SidebarMenu: React.FC<SidebarMenuProps> = ({
	title,
	links,
	maintenanceMode,
	collapsed,
}) => {
	const collapsedClass = styles.nestedWrapper + ' ' + styles.collapsed;
	const [classes, setClasses] = useState(styles.nestedWrapper);

	useEffect(() => {
		collapsed && setClasses(collapsedClass);
		!collapsed && setClasses(styles.nestedWrapper);
	}, [collapsed]);

	const generateSubmenu = (links: SidebarLinkProps[]) => {
		return (
			<Flex cfg={{ flexDirection: 'column', pl: 6 }} className={classes}>
				{links.map(
					({ onClick = () => {}, active = () => false, ...innerLink }, key) => (
						<React.Fragment key={key}>
							<Flex
								key={key}
								cfg={{ justifyContent: 'space-between', mb: links ? 5 : 1 }}
								className={styles.nested}
							>
								<Link
									cfg={{
										color: 'primary.2',
										textAlign: 'left',
										fontWeight: 3,
										width: innerLink.hideIcon ? 10 : 8,
									}}
									disabled={innerLink.disabled}
									underline={active(innerLink.path)}
									onClick={() => onClick(innerLink)}
								>
									{innerLink.name}
								</Link>
								{!maintenanceMode && !innerLink.hideIcon && (
									<StatusIcon link={innerLink} />
								)}
							</Flex>
							{innerLink.links && generateSubmenu(innerLink.links)}
						</React.Fragment>
					),
				)}
			</Flex>
		);
	};

	return (
		<Flex cfg={{ flexDirection: 'column' }} className={styles.sidebarMenu}>
			<H3 cfg={{ fontWeight: 3, mt: 4, color: 'neutral.8', lineHeight: 6 }}>
				{title}
			</H3>
			<Hr cfg={{ my: 4 }} />
			{links.map(
				({ onClick = () => {}, active = () => false, ...link }, key) => (
					<Flex
						key={key}
						cfg={{
							justifyContent: 'space-between',
							mb: link.links ? 1 : 5,
							flexDirection: link.links ? 'column' : 'row',
						}}
						className={active(link.path) ? styles.activeLink : undefined}
					>
						<Flex
							cfg={{
								justifyContent: 'space-between',
								width: 10,
								mb: link.links ? 5 : 1,
							}}
						>
							<Link
								cfg={{
									color: 'primary.2',
									textAlign: 'left',
									fontWeight: 3,
									width: link.hideIcon ? 10 : 8,
								}}
								disabled={link.disabled}
								underline={active(link.path)}
								onClick={() => onClick(link)}
							>
								{link.name}
							</Link>
							{!maintenanceMode && !link.hideIcon && <StatusIcon link={link} />}
						</Flex>
						{link.links && generateSubmenu(link.links)}
					</Flex>
				),
			)}
		</Flex>
	);
};

export default React.memo(SidebarMenu);
