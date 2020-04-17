import React from 'react';
import { styled } from '@tpr/theming';
import { Flex, P } from '@tpr/core';
import { ArrowDown, ArrowUp } from '@tpr/icons';
import { useTheme } from 'styled-components';

const Button = styled('button')<any>`
	text-align: left;
	background: transparent;
	box-shadow: none;
	border: none;
	color: ${({ theme }) => theme.colors.primary[200]};
	border-bottom: 2px solid ${({ theme }) => theme.colors.primary[200]};
	padding: 0 0 4px 2px;

	width: 100%;
	height: ${({ theme }) => theme.space[3]}px;
	/* font-size: ${({ theme }) => theme.fontSizes[1]}px;
	font-weight: ${({ theme }) => theme.fontWeights[2]}; */
	cursor: pointer;

	&:hover {
		color: ${({ theme }) => theme.colors.primary[300]};
		border-bottom: 2px solid ${({ theme }) => theme.colors.primary[300]};
	}

	&:focus {
	}

	&:disabled {
		color: ${({ theme }) => theme.colors.neutral[300]};
		border-bottom: 2px solid ${({ theme }) => theme.colors.neutral[300]};
		cursor: not-allowed;
	}

	&:active {
	}
`;

type UnderlinedButton = {
	isOpen?: boolean;
	onClick?: Function;
	disabled?: boolean;
};
export const UnderlinedButton: React.FC<UnderlinedButton> = ({
	children,
	isOpen,
	...rest
}) => {
	const { colors }: any = useTheme();

	return (
		<Button {...rest}>
			<Flex flex="0 0 auto" alignItems="center">
				<P fontSize={1} fontWeight={2}>
					{children}
				</P>
				{isOpen ? (
					<ArrowUp width="24px" fill={colors.primary[200]} />
				) : (
					<ArrowDown width="24px" fill={colors.primary[200]} />
				)}
			</Flex>
		</Button>
	);
};
