import React, { ChangeEvent } from 'react';
import { Link, LinkProps, Flex } from '@tpr/core';
import { ArrowIcon } from './icons';

// TODO: update icon colors from the theming variables once ready.

type ArrowLinkProps = {
	onClick: (evt: ChangeEvent<HTMLInputElement>) => void;
	title?: string;
	pointsTo?: 'left' | 'up' | 'right' | 'down';
	iconSide?: 'left' | 'right';
	underline?: boolean;
	testId?: string;
	cfg?: LinkProps['cfg'];
};
export const ArrowLink: React.FC<ArrowLinkProps> = ({
	onClick,
	testId,
	underline = true,
	title = 'Back',
	pointsTo = 'left',
	iconSide = 'left',
	cfg,
}) => {
	return (
		<Link cfg={cfg} onClick={onClick} underline={underline} testId={testId}>
			<Flex cfg={{ alignItems: 'center' }}>
				{iconSide === 'left' && <ArrowIcon pointsTo={pointsTo} />}
				<>{title}</>
				{iconSide === 'right' && <ArrowIcon pointsTo={pointsTo} />}
			</Flex>
		</Link>
	);
};
