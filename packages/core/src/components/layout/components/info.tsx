import React from 'react';
import { styled } from '@tpr/theming';
import { H2 } from '../../typography';

type StyledInfoProps = {
	isImportant?: boolean;
};
const StyledInfo = styled('div')<StyledInfoProps>`
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 30px;
	background: #eee;
	color: #333;
	margin-top: ${({ isImportant }) => (isImportant ? '40px' : 0)};
	border-top: ${({ isImportant }) => (isImportant ? '6px solid #333' : null)};
`;

const StyledInfoImportant = styled('div')`
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 300;
	font-size: 18px;
	position: absolute;
	left: 0;
	height: 46px;
	top: -47px;
	padding: 0 30px;
	background: #333;
	color: #fff;
`;

type InfoProps = {
	important?: string;
	title?: string;
	testId?: string;
};

export const Info: React.FC<InfoProps> = ({
	children,
	title,
	testId,
	important = undefined,
}) => {
	const isImportant = typeof important === 'string' && important.length > 0;
	return (
		<StyledInfo data-testid={testId} isImportant={isImportant}>
			{isImportant && <StyledInfoImportant>{important}</StyledInfoImportant>}
			{title && <H2 mb={2}>{title}</H2>}
			{children}
		</StyledInfo>
	);
};
