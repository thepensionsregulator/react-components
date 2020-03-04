import styled, { css } from 'styled-components';
import {
	space,
	color,
	typography,
	SpaceProps,
	ColorProps,
	TypographyProps,
} from 'styled-system';

interface HtmlHTagTypes extends SpaceProps, ColorProps, TypographyProps {}

export const fontStack = css`
	font-family: ${({ theme }) => theme.fonts.serif};
`;

export const H1 = styled.h1<HtmlHTagTypes>`
	${fontStack};

	font-weight: ${({ theme }) => theme.fontWeights[1]};
	font-size: ${({ theme }) => theme.fontSizes[5]}px;
	letter-spacing: 0.4px;
	margin: 0;
	padding: 0;

	${color};
	${typography};
	${space};
`;

export const H2 = styled.h2<HtmlHTagTypes>`
	${fontStack};

	font-weight: ${({ theme }) => theme.fontWeights[2]};
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
	letter-spacing: 0.4px;
	margin: 0;
	padding: 0;

	${color};
	${typography};
	${space};
`;

export const H3 = styled.h3<HtmlHTagTypes>`
	${fontStack};

	font-weight: ${({ theme }) => theme.fontWeights[1]};
	font-size: ${({ theme }) => theme.fontSizes[3]}px;
	letter-spacing: 0.4px;
	margin: 0;
	padding: 0;

	${color};
	${typography};
	${space};
`;

export const H4 = styled.h4<HtmlHTagTypes>`
	${fontStack};

	font-weight: ${({ theme }) => theme.fontWeights[1]};
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	letter-spacing: 0.4px;
	margin: 0;
	padding: 0;

	${color};
	${typography};
	${space};
`;

export const H5 = styled.h5<HtmlHTagTypes>`
	${fontStack};

	font-weight: ${({ theme }) => theme.fontWeights[1]};
	font-size: ${({ theme }) => theme.fontSizes[1]}px;
	letter-spacing: 0.4px;
	margin: 0;
	padding: 0;

	${color};
	${typography};
	${space};
`;

export const H6 = styled.h6<HtmlHTagTypes>`
	${fontStack};

	font-weight: ${({ theme }) => theme.fontWeights[1]};
	font-size: ${({ theme }) => theme.fontSizes[0]}px;
	letter-spacing: 0.4px;
	margin: 0;
	padding: 0;

	${color};
	${typography};
	${space};
`;

export const P = styled.p<HtmlHTagTypes>`
	${fontStack};

	font-weight: ${({ theme }) => theme.fontWeights[1]};
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	letter-spacing: 0.9px;
	line-height: 1.4;
	margin: 0;
	padding: 0;

	${color};
	${typography};
	${space};
`;

export const Text = styled(P)``;

export const Span = styled('span')<HtmlHTagTypes>`
	${fontStack};

	${color};
	${typography};
	${space};
`;

interface LinkProps extends SpaceProps {
	appearance?: 'default' | 'primary';
}

export const Link = styled('a').attrs<LinkProps>(
	({ theme, appearance = 'default' }) => ({
		color:
			appearance === 'default'
				? theme.colors.neutral[300]
				: theme.colors.primary[200],
	}),
)<LinkProps>`
	${fontStack};

	font-weight: ${({ theme }) => theme.fontWeights[1]};
	text-decoration: underline;
	color: ${({ color }) => color};
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	letter-spacing: 0.9px;
	line-height: 1.4;
	margin: 0;
	padding: 0;
	cursor: pointer;

	${space};
`;
