import React from 'react';
import { styled } from '@tpr/theming';
import {
	compose,
	space,
	color,
	border,
	layout,
	flexbox,
	typography,
} from 'styled-system';
import {
	BorderProps,
	ColorProps,
	FlexboxProps,
	SpaceProps,
	LayoutProps,
	TypographyProps,
} from 'styled-system';

export interface DocWidthProps
	extends BorderProps,
		ColorProps,
		FlexboxProps,
		SpaceProps {}

export const DocWidth = styled.div<DocWidthProps>`
	display: flex;
	width: 100%;

	position: relative;

	${space}
	${border}
	${color}
	${flexbox}
`;

export const AppWidth = styled.div<{ zIndex?: number }>`
	width: 100%;
	max-width: 1000px;
	z-index: ${({ zIndex }) => (zIndex ? zIndex : undefined)};
`;

export const Container: React.FC = ({ children, ...rest }) => {
	return (
		<DocWidth
			justifyContent="center"
			bg="#eeeeee"
			borderTop="5px solid #777"
			{...rest}
		>
			<AppWidth>{children}</AppWidth>
		</DocWidth>
	);
};

/**
 * There will be 2 grid components for the Body component
 * 1. Grid component with 1 column with rows layout
 * 2. Grid component with 2 columns first for sidebar and second for rows layout
 */
export const BodyWithSidebar = () => null;

interface FlexProps
	extends FlexboxProps,
		SpaceProps,
		LayoutProps,
		TypographyProps,
		ColorProps,
		BorderProps {}
export const Flex = styled('div').attrs(() => ({
	display: 'flex',
}))<FlexProps>(compose(flexbox, space, layout, typography, color, border));
