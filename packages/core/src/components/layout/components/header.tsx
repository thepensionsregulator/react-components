import React from 'react';
import { styled } from '@tpr/theming';
import { DocWidth, AppWidth, Flex } from './globals';
import { Button } from '../../buttons';
import { P } from '../../typography';

const Logo = styled('div')`
	display: flex;
	flex: 0 0 auto;
	align-items: flex-start;
	justify-content: flex-start;
	width: 180px;
	margin-right: 15px;
	padding-right: 15px;

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
					<DocWidth justifyContent="space-between" p={2}>
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
							<Button
								scale="small"
								appearance="link"
								textDecoration="underline"
								data-testid="onClickSchemeOptions"
								onClick={onClickSchemeOptions}
								mr={1}
							>
								Scheme Options
							</Button>
							<Button
								scale="small"
								appearance="link"
								textDecoration="underline"
								data-testid="onClickLogout"
								onClick={onClickLogout}
							>
								Log out
							</Button>
						</Flex>
					</DocWidth>
				</Flex>
			</AppWidth>
		</DocWidth>
	);
};
