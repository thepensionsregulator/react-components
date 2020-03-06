import React from 'react';
import { styled } from '@tpr/theming';
import { Flex } from '../../layout';
import { Button } from '../../buttons';
import { H3, H4 } from '../../typography';

type StyledCardProps = { complete?: boolean };

export const StyledCard = styled('div')<StyledCardProps>`
	display: flex;
	flex-direction: column;
	box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
	border: 1px solid #ddd;
	border-left: ${({ theme, complete }) =>
		`6px solid ${
			complete ? theme.colors.success[200] : theme.colors.danger[200]
		}`};
	/* TODO: temp margin for preview, remove later. */
	margin: 20px;
`;

export const StyledCardToolbar = styled('div')`
	display: flex;
	flex-direction: column;
	flex: 0 0 auto;
	justify-content: space-evenly;
	align-items: flex-start;

	${({ theme }) => theme.mediaQueries.sm`
		flex-direction: row;
	`}
`;

type ToolbarProps = {
	title: string;
};

export const Toolbar: React.FC<ToolbarProps> = ({ title }) => {
	return (
		<Flex
			flexDirection="column"
			borderBottom="1px solid"
			borderColor="neutral.200"
			mb={2}
			pb={1}
		>
			<H4 color="neutral.300">Edit trustee</H4>
			<H3 fontWeight="bold">{title}</H3>
		</Flex>
	);
};

type FooterProps = {
	onContinue?: {
		type?: 'button' | 'submit' | 'reset';
		title?: string;
		fn?: () => void;
	};
	onSave?: {
		type?: 'button' | 'submit' | 'reset';
		title?: string;
		fn?: () => void;
	};
	isDisabled?: boolean;
};

export const Footer: React.FC<FooterProps> = ({
	onContinue,
	onSave,
	isDisabled = false,
}) => {
	return (
		<Flex
			flex="0 0 auto"
			height={100}
			alignItems="center"
			justifyContent="flex-start"
		>
			{onContinue && (
				<Button
					type={onContinue?.type}
					onClick={onContinue.fn}
					disabled={isDisabled}
				>
					{onContinue.title}
				</Button>
			)}
			{onSave && (
				<Button type={onSave?.type} onClick={onSave.fn} disabled={isDisabled}>
					{onSave.title}
				</Button>
			)}
		</Flex>
	);
};
