import React, { useState, useEffect } from 'react';
import { H2, Flex, Hr, Link } from '@tpr/core';
import { SidebarLinkProps, SidebarMenuProps } from './types';
import StatusIcon from './StatusIcon';
import styles from '../sidebar.module.scss';

const SidebarMenu: React.FC<SidebarMenuProps> = ({
	title,
	links,
	maintenanceMode,
	collapsed,
	sectionCompleteLabel,
	sectionIncompleteLabel,
}) => {
	const collapsedClass = styles.nestedWrapper + ' ' + styles.collapsed;
	const [classes, setClasses] = useState(styles.nestedWrapper);
	const getTopLevelStyles = (link: SidebarLinkProps, isActive: (path: string, exact: boolean) => {}) => {
		if (isActive(link.path, false)) {
			return (isActive(link.path, true)) ?  
				`${styles.topLevel} ${styles.activeLink}` :
				`${styles.topLevel} ${styles.activeLink} ${styles.withSelectedChild}`;
		}
		else {
			return styles.topLevel;
		} 
	}
	useEffect(() => {
		collapsed && setClasses(collapsedClass);
		!collapsed && setClasses(styles.nestedWrapper);
	}, [collapsed]);
	
	const generateSubmenu = (links: SidebarLinkProps[]) => {
		return (
			<Flex cfg={{ flexDirection: 'column', pl: 6 }} className={classes}>
				<ul className={styles.list}>
					{links.map(
						(
							{ onClick = () => {}, active = () => false, ...innerLink },
							key,
						) => (
							<li key={key}>
								<Flex
									cfg={{ justifyContent: 'space-between', mb: links ? 5 : 1 }}
									className={active(innerLink.path, true) ? `${styles.nested} ${styles.activeLink}` : styles.nested}
									>
									<Link
										cfg={{
											color: 'primary.2',
											textAlign: 'left',
											fontWeight: 3,
											width: innerLink.hideIcon ? 10 : 8,
										}}
										disabled={innerLink.disabled}
										onClick={() => onClick(innerLink)}
									>
										<Flex
											cfg={{
												flexDirection: 'row',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<span>{innerLink.name}</span>
											{!maintenanceMode && !innerLink.hideIcon && (
												<StatusIcon
													link={innerLink}
													sectionCompleteLabel={sectionCompleteLabel}
													sectionIncompleteLabel={sectionIncompleteLabel}
												/>
											)}
										</Flex>
									</Link>
								</Flex>
								{innerLink.links && generateSubmenu(innerLink.links)}
							</li>
						),
					)}
				</ul>
			</Flex>
		);
	};

	return (
		<Flex cfg={{ flexDirection: 'column' }} className={styles.sidebarMenu}>
			<H2
				cfg={{ fontWeight: 3, mt: 4, color: 'neutral.8', lineHeight: 6 }}
				className={styles.styledAsH3}
			>
				{title}
			</H2>
			<Hr cfg={{ my: 4 }} />
			<ul className={styles.list}>
				{links.map(
					({ onClick = () => {}, active = () => false, ...link }, key) => (
						<li key={key}>
							<Flex
								cfg={{
									justifyContent: 'space-between',
									mb: link.links ? 1 : 5,
									flexDirection: link.links ? 'column' : 'row',
								}}
								className={getTopLevelStyles(link, active)}
							>
								<Flex
									cfg={{
										justifyContent: 'space-between',
										width: 10,
										mb: link.links ? 5 : 1,
									}}
									className={styles.topLevelWrapper}
								>
									<Link
										cfg={{
											color: 'primary.2',
											textAlign: 'left',
											fontWeight: 3,
											width: link.hideIcon ? 10 : 8,
										}}
										disabled={link.disabled}
										onClick={() => onClick(link)}
									>
										<Flex
											cfg={{
												flexDirection: 'row',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<span>{link.name}</span>
											{!maintenanceMode && !link.hideIcon && (
												<StatusIcon
													link={link}
													sectionCompleteLabel={sectionCompleteLabel}
													sectionIncompleteLabel={sectionIncompleteLabel}
												/>
											)}
										</Flex>
									</Link>
								</Flex>
								{link.links &&
									link.links.length > 0 &&
									generateSubmenu(link.links)}
							</Flex>
						</li>
					),
				)}
			</ul>
		</Flex>
	);
};

export default React.memo(SidebarMenu);
