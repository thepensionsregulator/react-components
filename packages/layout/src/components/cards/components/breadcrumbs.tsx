import React, { Fragment } from 'react';
import { Flex, Link } from '@tpr/core';
import { ArrowRight } from '@tpr/icons';

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
		<Flex cfg={{ alignItems: 'center' }}>
			{links.map((link, index) => {
				return (
					<Fragment key={index}>
						<Link
							onClick={() => link.to && send(link.to)}
							underline={link.underline}
							disabled={link.disabled}
						>
							{link.name}
						</Link>
						{index !== totalLinks && <ArrowRight fill="#036db8" />}
					</Fragment>
				);
			})}
		</Flex>
	);
};
