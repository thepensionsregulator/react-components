import styled, { css } from 'styled-components';

export const editorFontStack = css`
	font-family: ${({ theme }) => theme.fonts.serif};
	font-weight: ${({ theme }) => theme.fontWeights[0]};
	font-size: ${({ theme }) => theme.fontSizes[1]}px;

	h1 {
		font-size: ${({ theme }) => theme.fontSizes[5]}px;
	}
	h2 {
		font-size: ${({ theme }) => theme.fontSizes[4]}px;
	}
	h3 {
		font-size: ${({ theme }) => theme.fontSizes[3]}px;
	}
	h4 {
		font-size: ${({ theme }) => theme.fontSizes[2]}px;
	}
	h5 {
		font-size: ${({ theme }) => theme.fontSizes[1]}px;
	}
	h6 {
		font-size: ${({ theme }) => theme.fontSizes[0]}px;
	}
	p {
		font-size: ${({ theme }) => theme.fontSizes[0]}px;
	}
	b {
		font-weight: ${({ theme }) => theme.fontWeights[3]};
	}
	strong {
		font-weight: ${({ theme }) => theme.fontWeights[3]};
	}
	span {
		font-size: ${({ theme }) => theme.fontSizes[0]}px;
	}
	hr {
	}
	i {
		font-style: italic;
	}
	u {
		text-decoration: underline;
	}
	del {
		text-decoration: line-through;
	}
	ul {
	}
	ol {
	}
	ul > li {
	}
	blockquote {
		background: ${({ theme }) => theme.colors.neutral['200']};
	}
`;

export const RichTextWrapper = styled('div')`
	${editorFontStack}
`;
