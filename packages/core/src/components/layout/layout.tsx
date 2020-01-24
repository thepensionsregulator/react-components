import React from 'react';
import styled from 'styled-components';
import { compose, space, color, border, layout, flexbox, typography } from 'styled-system';
import { BorderProps, ColorProps, FlexboxProps, SpaceProps, LayoutProps, TypographyProps } from 'styled-system';
import { P, Link, H2 } from '../typography';

const DocWidth = styled.div<BorderProps & ColorProps & FlexboxProps & SpaceProps>`
	display: flex;
	width: 100%;

	${space}
	${border}
	${color}
	${flexbox}
`;

const AppWidth = styled.div`
	width: 100%;
	max-width: 1000px;
`;

export const Container: React.FC = ({ children, ...rest }) => {
	return (
		<DocWidth justifyContent="center" bg="#eeeeee" borderTop="5px solid #777" {...rest}>
			<AppWidth>{children}</AppWidth>
		</DocWidth>
	);
};

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
					<Logo>{logoUrl ? <img src={logoUrl} alt="TPR Logo" /> : 'logo placeholder'}</Logo>
					<Flex flex="1 1 auto" />
					{menus.map((menu, key: number) => (
						<Flex key={key} flex="0 0 auto" maxWidth="200px" pl={4} flexDirection="column">
							{menu.map(({ title, url, ...linkProps }, key: number) => (
								<Link key={key} href={url} mb={1} {...linkProps}>
									{title}
								</Link>
							))}
						</Flex>
					))}
				</LevelOne>
				<DocWidth borderTop="1px solid #CCC" flexWrap="wrap" justifyContent="space-between" p={2}>
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

const StyledInfo = styled('div')<{ isImportant?: boolean }>`
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
};

export const Info: React.FC<InfoProps> = ({ children, title, important = undefined }) => {
	const isImportant = typeof important === 'string' && important.length > 0;
	return (
		<StyledInfo isImportant={isImportant}>
			{isImportant && <StyledInfoImportant>{important}</StyledInfoImportant>}
			{title && <H2 mb={2}>{title}</H2>}
			{children}
		</StyledInfo>
	);
};

// TODO: alert with like buttons theme colours
export const StyledAlert = styled('div')``;
export const Alert: React.FC = ({ children }) => {
	return <StyledAlert>{children}</StyledAlert>;
};

type FlexProps = FlexboxProps & SpaceProps & LayoutProps & TypographyProps & ColorProps & BorderProps;

export const Flex = styled('div').attrs(() => ({
	display: 'flex',
}))<FlexProps>(compose(flexbox, space, layout, typography, color, border));

type TextProps = TypographyProps & SpaceProps & ColorProps;

export const Text = styled('span').attrs(() => ({
	overflowWrap: 'break-word',
	lineHeight: '1em',
}))<TextProps>(compose(typography, space, color));
