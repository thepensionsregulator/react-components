import { styled } from '@tpr/theming';

interface StyledInputProps {
	meta?: any;
	padding?: number;
}
export const StyledInput = styled('input')<StyledInputProps>`
	display: flex;
	width: 100%;
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-weight: ${({ theme }) => theme.fontWeights[0]}px;
	background: ${({ theme }) => theme.colors.background};
	border: ${({ meta, theme }) => {
		if (meta && meta.touched && meta.error) {
			return `4px solid ${theme.colors.danger[300]}`;
		} else {
			return `2px solid ${theme.colors.neutral[900]}`;
		}
	}};
	height: 40px;
	outline: none;
	padding: 0 5px;

	&:focus {
		border: 4px solid ${({ theme }) => theme.colors.neutral[900]};
		box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.warning[300]};
	}

	&:disabled {
		background: ${({ theme }) => theme.colors.neutral['A50']};
	}
`;
