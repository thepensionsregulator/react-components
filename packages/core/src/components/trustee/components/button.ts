import styled from 'styled-components';

export const Button = styled('button')`
	text-align: left;
	background: transparent;
	box-shadow: none;
	border: none;
	color: ${({ theme }) => theme.colors.primary[200]};
	border-bottom: 2px solid ${({ theme }) => theme.colors.primary[200]};

	width: 100%;
	height: ${({ theme }) => theme.space[4]}px;
	font-size: ${({ theme }) => theme.fontSizes[3]}px;
	font-weight: ${({ theme }) => theme.fontWeights[2]};
	cursor: pointer;

	&:hover {
		color: ${({ theme }) => theme.colors.primary[300]};
		border-bottom: 2px solid ${({ theme }) => theme.colors.primary[300]};
	}

	&:focus {
	}

	&:disabled {
		color: ${({ theme }) => theme.colors.neutral[300]};
		border-bottom: 2px solid ${({ theme }) => theme.colors.neutral[300]};
		cursor: not-allowed;
	}

	&:active {
	}
`;
