import React from 'react';
import styled from 'styled-components';
import { DocWidth, AppWidth, Flex } from './globals';
import { P } from '../../typography';

const WhiteLinkButton = styled('button')`
	background: transparent;
	box-shadow: none;
	border: none;
	color: white;
	border: none;
	text-decoration: none;
	padding-right: 0;
	padding-left: 0;
	text-decoration: underline;
	margin-left: 15px;
	cursor: pointer;

	height: ${({ theme }) => theme.space[5]}px;
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
`;

const Logo = styled('div')`
	display: flex;
	flex: 0 0 auto;
	align-items: flex-start;
	justify-content: flex-start;
	width: 180px;

	img {
		width: 100%;
	}
`;

type HeaderProps = {
	logoUrl: string;
	title: string;
	onClickSchemeOptions: () => void;
	onClickLogout: () => void;
};

export const Header: React.FC<HeaderProps> = ({
	logoUrl,
	title = 'Exchange - Scheme return',
	onClickSchemeOptions,
	onClickLogout,
}) => {
	return (
		<DocWidth justifyContent="center" bg="accents.300" color="white">
			<AppWidth>
				<Flex flexDirection="column">
					<DocWidth justifyContent="space-between" py={2}>
						<Flex alignItems="center">
							<Flex
								width="240px"
								borderRight="1px solid"
								borderColor="accents.200"
								mr={3}
							>
								<Logo>
									{logoUrl ? (
										<img src={logoUrl} alt="TPR Logo" />
									) : (
										'logo placeholder'
									)}
								</Logo>
							</Flex>
							<P>{title}</P>
						</Flex>
						<Flex alignItems="center">
							<WhiteLinkButton
								data-testid="onClickSchemeOptions"
								onClick={onClickSchemeOptions}
							>
								Scheme Options
							</WhiteLinkButton>
							<WhiteLinkButton
								data-testid="onClickLogout"
								onClick={onClickLogout}
							>
								Log out
							</WhiteLinkButton>
						</Flex>
					</DocWidth>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
