import React from 'react';
import styled from 'styled-components';
import { DocWidth, AppWidth, Flex } from './globals';
import { Button } from '../../buttons';

export const Logo = styled('div')`
	display: flex;
	flex: 0 0 auto;
	align-items: flex-start;
	justify-content: flex-start;
	width: 180px;
	margin-right: 15px;
	padding-right: 15px;

	border-right: 1px solid ${({ theme }) => theme.colors.neutral[200]};

	img {
		width: 100%;
	}
`;

export const Header = ({ logoUrl }) => {
	return (
		<DocWidth justifyContent="center" bg="#eeeeee">
			<AppWidth>
				<Flex flexDirection="column">
					<DocWidth justifyContent="space-between" p={2}>
						<Flex alignItems="center">
							<Logo>
								{logoUrl ? (
									<img src={logoUrl} alt="TPR Logo" />
								) : (
									'logo placeholder'
								)}
							</Logo>
							<span>Exchange - Scheme return</span>
						</Flex>
						<Flex alignItems="center">
							<Button scale="small" appearance="link">
								Scheme Options
							</Button>
							<Button scale="small" appearance="link">
								Log out
							</Button>
						</Flex>
					</DocWidth>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
