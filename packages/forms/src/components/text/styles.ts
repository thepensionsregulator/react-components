import styled from 'styled-components';

type StyledInputProps = {
	meta?: any;
	padding?: number;
};
export const StyledInput = styled('input')<StyledInputProps>`
	display: flex;
	flex: 1 1 auto;
	width: 100%;
	font-size: ${({ theme }) => theme.fontSizes[1]}px;
	font-weight: 300;
	background: ${({ theme }) => theme.colors.background};
	border: ${({ meta, theme }) => {
		if (meta && meta.touched && meta.error) {
			return `1px solid ${theme.colors.accents.danger}`;
		} else {
			return `1px solid ${theme.colors.neutral[200]}`;
		}
	}};
	height: 50px;
	outline: none;
	padding: 15px;
	&::-webkit-input-placeholder {
		color: ${({ theme }) => theme.colors.neutral['600']};
	}
	&:-moz-placeholder {
		color: ${({ theme }) => theme.colors.neutral['600']};
	}
	&:-ms-input-placeholder {
		color: ${({ theme }) => theme.colors.neutral['600']};
	}
	&:focus {
		border: 1px solid ${({ theme }) => theme.colors.primary['200']};
		box-shadow: inset 0 0 0 4px ${({ theme }) => theme.colors.primary['200']};
	}
	&:disabled {
		background: ${({ theme }) => theme.colors.neutral['A50']};
	}
`;
