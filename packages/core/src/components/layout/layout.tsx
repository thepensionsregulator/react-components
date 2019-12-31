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

const StyledFooter = styled.footer`
	display: flex;
	flex-direction: column;
	background: #eee;
`;

interface FooterProps extends ContainerProps {
	menus: object[][];
}

// NOTE: it might require all the text to be managed by SiteCore so
// it might need to be rendered from props.
export const Footer: React.FC<FooterProps> = ({ menus, ...props }) => {
	return (
		<Container {...props}>
			<StyledFooter>
				<DocWidth justifyContent="space-between" py={50} px={20}>
					<Flex flex="0 0 auto" width="140px" mr={100}>
						logo
					</Flex>
					<Flex flex="1 1 auto" justifyContent="space-between">
						{menus.map((menu, key) => (
							<Flex key={key} flexDirection="column">
								{menu.map(({ title, ...linkProps }: any, index: number) => (
									<Link key={index} {...linkProps}>
										{title}
									</Link>
								))}
							</Flex>
						))}
					</Flex>
				</DocWidth>
				<DocWidth borderTop="1px solid #CCC" justifyContent="space-between" p={20}>
					<Flex>
						<Link href="#" mr={10}>
							Website help
						</Link>
						<Link href="#" mr={10}>
							Cymraeg
						</Link>
						<Link href="#">Site map</Link>
					</Flex>
					<Flex>
						<P>© The Pensions Regulator</P>
					</Flex>
				</DocWidth>
			</StyledFooter>
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
