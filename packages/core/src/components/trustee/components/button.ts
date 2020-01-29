import styled from 'styled-components';

// TODO: transform Buttons to have text aligned to left and underline to be border?
// should use button from buttons rather than this new button...

export const Button = styled('button')`
	text-align: left;
	background: transparent;
	box-shadow: none;
	border: none;
	color: ${({ theme }) => theme.colors.primary[200]};
	border-bottom: 2px solid ${({ theme }) => theme.colors.primary[200]};

	width: 100%;
	height: ${({ theme }) => theme.space[4]}px;
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
	cursor: pointer;

	&:hover {
		color: ${({ theme }) => theme.colors.primary[300]};
		border-bottom: 2px solid ${({ theme }) => theme.colors.primary[300]};
	}

	&:focus {
	}

	&:disabled {
	}

	&:active {
	}
`;
