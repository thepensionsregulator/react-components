import React from 'react';
import { Flex, Link } from '@tpr/core';
import { ArrowRight } from '@tpr/icons';
import styles from './breadcrumbs.module.scss';

export type BreadcrumbLink = {
	to?: 'BACK';
	name: string;
	underline?: boolean;
	disabled?: boolean;
};

type BreadcrumbsProps = { links: BreadcrumbLink[]; send: Function };
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ links, send }) => {
	const totalLinks = links.length - 1;
	if (links.length < 1) return null;
	return (
		<Flex className={styles.breadcrumbsWrapper}>
			{links.map((link, index) => {
				return (
					<Flex key={index}>
						{index > 0 && index <= totalLinks && <ArrowRight fill="#036db8" />}
						<Link
							onClick={() => link.to && send(link.to)}
							underline={link.underline}
							disabled={link.disabled}
						>
							{link.name}
						</Link>
					</Flex>
				);
			})}
		</Flex>
	);
};
