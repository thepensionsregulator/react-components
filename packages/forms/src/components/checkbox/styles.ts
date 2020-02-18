import styled from 'styled-components';

type StyledCheckboxWrapper = {
	align?: string;
	disabled?: boolean;
};

export const StyledCheckboxWrapper = styled('div')<StyledCheckboxWrapper>`
	display: flex;
	flex-direction: 'row';
	color: ${({ theme }) => theme.colors.neutral['800']};
	align-items: ${props => props.align};
	line-height: 1.4;
	cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
	&:hover {
		color: ${({ theme, disabled }) =>
			disabled ? theme.colors.neutral['800'] : theme.colors.primary['200']};
	}
	> div {
		margin-right: 8px;
	}
	> a {
		text-decoration: none;
		color: ${({ theme }) => theme.colors.primary['200']};
		font-weight: 600;
		border-bottom: 2px solid transparent;
		position: relative;
		padding-bottom: 0px;
		&:hover {
			border-bottom: 2px solid ${({ theme }) => theme.colors.primary['200']};
			padding-bottom: 2px;
		}
	}
`;
