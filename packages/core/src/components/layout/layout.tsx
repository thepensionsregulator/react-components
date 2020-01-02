import React from 'react';
import styled from 'styled-components';
import { compose, space, color, border, layout, flexbox, typography } from 'styled-system';
import { BorderProps, ColorProps, FlexboxProps, SpaceProps, LayoutProps, TypographyProps } from 'styled-system';
import { P, Link } from '../typography';

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

type ContainerProps = {
	borderTop: string;
	bg: string;
};

export const Container: React.FC<ContainerProps> = ({ children, ...rest }) => {
	return (
		<DocWidth justifyContent="center" {...rest}>
			<AppWidth>{children}</AppWidth>
		</DocWidth>
	);
};

type FooterLinkProps = {
	title: string;
	url: string;
	size?: number;
};

interface FooterProps extends ContainerProps {
	/** accepts 2d array of type FooterLinkProps objects, each array represents column in a footer */
	menus: FooterLinkProps[][];
	/** accepts an array of type FooterLinkProps objects */
	links: FooterLinkProps[];
	/** accepts a valid logo url, must be https */
	logoUrl?: string;
}

const Logo = styled('div')`
	display: flex;
	flex: 0 0 auto;
	align-items: flex-start;
	justify-content: flex-start;
	margin-right: 100px;
	width: 180px;

	img {
		width: 100%;
	}
`;

export const Footer: React.FC<FooterProps> = ({ menus, links, logoUrl, ...props }) => {
	return (
		<Container {...props}>
			<Flex flexDirection="column">
				<DocWidth justifyContent="space-between" py={50} px={20}>
					<Logo>{logoUrl ? <img src={logoUrl} alt="TPR Logo" /> : 'logo'}</Logo>
					<Flex flex="1 1 auto" />
					<Flex justifyContent="space-around">
						{menus.map((menu, menuKey) => (
							<Flex flex="0 1 auto" width="100%" pl={10} key={menuKey} flexDirection="column">
								{menu.map(({ title, url, ...linkProps }, itemKey: number) => (
									<Link key={itemKey} href={url} mb={15} {...linkProps}>
										{title}
									</Link>
								))}
							</Flex>
						))}
					</Flex>
				</DocWidth>
				<DocWidth borderTop="1px solid #CCC" justifyContent="space-between" p={20}>
					<Flex>
						{links.map(({ title, url, ...linkProps }, key) => (
							<Link key={key} href={url} mr={15} {...linkProps}>
								{title}
							</Link>
						))}
					</Flex>
					<Flex>
						<P>© The Pensions Regulator</P>
					</Flex>
				</DocWidth>
			</Flex>
		</Container>
	);
};

type FlexProps = FlexboxProps & SpaceProps & LayoutProps & TypographyProps & ColorProps;

export const Flex = styled('div').attrs(() => ({
	display: 'flex',
}))<FlexProps>(compose(flexbox, space, layout, typography, color));

type TextProps = TypographyProps & SpaceProps & ColorProps;

export const Text = styled('span').attrs(() => ({
	overflowWrap: 'break-word',
	lineHeight: '1em',
}))<TextProps>(compose(typography, space, color));
