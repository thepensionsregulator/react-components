import React, { ChangeEvent } from 'react';
import { Link, LinkProps, Flex } from '@tpr/core';
import { ArrowIcon } from './icons';

export interface ArrowLinkProps extends LinkProps {
	onClick: (evt: ChangeEvent<HTMLInputElement>) => void;
	title?: string;
	pointsTo?: 'left' | 'up' | 'right' | 'down';
	iconSide?: 'left' | 'right';
}
export const ArrowLink: React.FC<ArrowLinkProps> = ({
	onClick,
	testId,
	underline = true,
	title = 'Back',
	pointsTo = 'left',
	iconSide = 'left',
	disabled,
	cfg,
}) => {
	return (
		<Link
			cfg={cfg}
			onClick={onClick}
			underline={underline}
			testId={testId}
			disabled={disabled}
		>
			<Flex cfg={{ alignItems: 'center' }}>
				{iconSide === 'left' && (
					<ArrowIcon
						fill={disabled ? 'neutral.6' : 'primary.3'}
						pointsTo={pointsTo}
					/>
				)}
				<>{title}</>
				{iconSide === 'right' && (
					<ArrowIcon
						fill={disabled ? 'neutral.6' : 'primary.3'}
						pointsTo={pointsTo}
					/>
				)}
			</Flex>
		</Link>
	);
};
