import React from 'react';
import styled from 'styled-components';
import { P, Link } from '../../typography';
import { Container, Flex, DocWidth } from './globals';

type FooterLinkProps = {
	title: string;
	url: string;
	size?: number;
};

type FooterProps = {
	/** accepts 2d array of type FooterLinkProps objects, each array represents column in a footer */
	menus: FooterLinkProps[][];
	/** accepts an array of type FooterLinkProps objects */
	links: FooterLinkProps[];
	/** accepts a valid logo url, must be https */
	logoUrl?: string;
	/** accepts copyright description */
	copyright?: string;
};

const Logo = styled('div')`
	display: flex;
	flex: 0 0 auto;
	align-items: flex-start;
	justify-content: flex-start;
	width: 180px;
	margin: ${({ theme }) => theme.space[4]}px;

	img {
		width: 100%;
	}

	${({ theme }) => theme.mediaQueries.sm`
		margin: 0px;
	`};

	${({ theme }) => theme.mediaQueries.md`
		margin-right: 100px;
	`};
`;

export const LevelOne = styled('div')`
	display: flex;
	flex-direction: column;
	width: 100%;

	${({ theme }) => theme.mediaQueries.sm`
		flex-direction: row;
		justify-content: space-between;
		padding: ${theme.space[6]}px ${theme.space[2]}px;
	`};
`;

export const Footer: React.FC<FooterProps> = ({
	menus,
	links,
	logoUrl,
	copyright = '© The Pensions Regulator',
	...props
}) => {
	return (
		<Container {...props}>
			<Flex flexDirection="column">
				<LevelOne>
					<Logo>
						{logoUrl ? (
							<img src={logoUrl} alt="TPR Logo" />
						) : (
							'logo placeholder'
						)}
					</Logo>
					<Flex flex="1 1 auto" />
					{menus.map((menu, key: number) => (
						<Flex
							key={key}
							flex="0 0 auto"
							maxWidth="200px"
							pl={4}
							flexDirection="column"
						>
							{menu.map(({ title, url, ...linkProps }, key: number) => (
								<Link key={key} href={url} mb={1} {...linkProps}>
									{title}
								</Link>
							))}
						</Flex>
					))}
				</LevelOne>
				<DocWidth
					borderTop="1px solid #CCC"
					flexWrap="wrap"
					justifyContent="space-between"
					p={2}
				>
					<Flex>
						{links.map(({ title, url, ...linkProps }, key: number) => (
							<Link key={key} href={url} mr={1} {...linkProps}>
								{title}
							</Link>
						))}
					</Flex>
					<Flex>
						<P>{copyright}</P>
					</Flex>
				</DocWidth>
			</Flex>
		</Container>
	);
};
