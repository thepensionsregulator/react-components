import React from 'react';
import styled from 'styled-components';
import { Flex } from '../../../layout';
import { Button } from '../../../buttons';
import { H2, H4 } from '../../../typography';

type StyledCardProps = { complete?: boolean };

export const StyledCard = styled('div')<StyledCardProps>`
	display: flex;
	flex-direction: column;
	box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
	border: 1px solid #ddd;
	border-left: ${({ theme, complete }) =>
		`6px solid ${complete ? theme.colors.success[200] : theme.colors.danger[200]}`};
	/* TODO: temp margin for preview, remove later. */
	margin: 20px;
`;

export const StyledCardToolbar = styled('div')`
	display: flex;
	flex: 0 0 auto;
	justify-content: space-between;
	align-items: flex-end;
	height: 60px;
	padding: 0 20px;
`;

type ToolbarProps = {
	title: string;
	subtitle: string;
};

export const Toolbar: React.FC<ToolbarProps> = ({ title, subtitle }) => {
	return (
		<Flex flex="0 0 auto" alignItems="center" flexDirection="column" height={100} borderBottom="1 solid grey" pb={1}>
			<Button appearance="link" children="< Back" />
			<H4>{subtitle}</H4>
			<H2>{title}</H2>
		</Flex>
	);
};

type FooterProps = {
	onContinue: () => void;
	onSave: () => void;
	isDisabled?: boolean;
};

export const Footer: React.FC<FooterProps> = ({ onContinue, onSave, isDisabled = false }) => {
	return (
		<Flex flex="0 0 auto" height={100} alignItems="center" justifyContent="flex-start">
			<Button onClick={onContinue} disabled={isDisabled}>
				Continue >
			</Button>
			<Button onClick={onSave} appearance="link" disabled={isDisabled}>
				Save and close ^
			</Button>
		</Flex>
	);
};
