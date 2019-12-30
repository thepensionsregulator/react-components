import styled, { css } from 'styled-components';
import { space, color, typography, SpaceProps, ColorProps, TypographyProps } from 'styled-system';

type HtmlHTagTypes = SpaceProps & ColorProps & TypographyProps;

export const fontStack = css`
	font-family: ${({ theme }) => theme.fonts.sansSerif};
`;

export const H1 = styled.h1<HtmlHTagTypes>`
	${fontStack};

	color: #3d3d3d;
	font-weight: ${({ theme }) => theme.fontWeights[0]};
	font-size: 45px;
	letter-spacing: 0.4px;
	margin: 0;
	padding: 0;

	${color};
	${typography};
	${space};
`;

export const H2 = styled.h2<HtmlHTagTypes>`
	${fontStack};

	color: #3d3d3d;
	font-weight: ${({ theme }) => theme.fontWeights[0]};
	font-size: 23px;
	letter-spacing: 0.4px;
	margin: 0;
	padding: 0;

	${color};
	${typography};
	${space};
`;

export const H3 = styled.h3<HtmlHTagTypes>`
	${fontStack};

	color: #3d3d3d;
	font-weight: ${({ theme }) => theme.fontWeights[0]};
	font-size: 16px;
	letter-spacing: 0.4px;
	margin: 0;
	padding: 0;

	${color};
	${typography};
	${space};
`;

export const H4 = styled.h4<HtmlHTagTypes>`
	${fontStack};

	color: #3d3d3d;
	font-weight: ${({ theme }) => theme.fontWeights[0]};
	font-size: 14px;
	letter-spacing: 0.4px;
	margin: 0;
	padding: 0;

	${color};
	${typography};
	${space};
`;

export const H5 = styled.h5<HtmlHTagTypes>`
	${fontStack};

	color: #3d3d3d;
	font-weight: ${({ theme }) => theme.fontWeights[0]};
	font-size: 13px;
	letter-spacing: 0.4px;
	margin: 0;
	padding: 0;

	${color};
	${typography};
	${space};
`;

export const H6 = styled.h6<HtmlHTagTypes>`
	${fontStack};

	color: #3d3d3d;
	font-weight: ${({ theme }) => theme.fontWeights[0]};
	font-size: 12px;
	letter-spacing: 0.4px;
	margin: 0;
	padding: 0;

	${color};
	${typography};
	${space};
`;

export const P = styled.p<HtmlHTagTypes>`
	${fontStack};

	color: #3d3d3d;
	font-weight: ${({ theme }) => theme.fontWeights[0]};
	font-size: 16px;
	letter-spacing: 0.9px;
	line-height: 1.4;
	margin: 0;
	padding: 0;

	${color};
	${typography};
	${space};
`;
