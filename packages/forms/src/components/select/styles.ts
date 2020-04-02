import { styled } from '@tpr/theming';

interface StyledSelectProps {
	meta?: any;
}
export const StyledSelectInput = styled('input')<StyledSelectProps>`
	display: flex;
	align-items: center;
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
	cursor: default;

	&:focus {
		border: 4px solid ${({ theme }) => theme.colors.neutral[900]};
		box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.warning[300]};
	}

	&:disabled {
		background: ${({ theme }) => theme.colors.neutral['A50']};
	}
`;

export const Menu = styled('div')``;
export const Item = styled('div')``;

/* Popup Styles */

type PopupProps = {
	isOpen?: boolean;
};
export const Popup = styled('div')<PopupProps>`
	display: ${({ isOpen }) => !isOpen && 'none'};
	flex: 0 0 auto;
	flex-direction: column;
	position: absolute;
	min-height: 30px;
	height: auto;
	color: #000;
	border: 1px dashed red;
	background: white;
	width: 100%;
	max-height: 280px;
	border: 1px solid #ddd;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	margin-top: 2px;
	z-index: 10;
	overflow-x: auto;
	user-select: none;
	padding: 10px;
`;

type PopupButtonProps = {
	isActive?: boolean;
	isSelected?: boolean;
	isClickable?: boolean;
};
export const PopupButton = styled('div')<PopupButtonProps>`
	width: 100%;
	text-align: left;
	font-family: ${({ theme }) => theme.fonts.serif};
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-weight: ${({ theme }) => theme.fontWeights[2]};
	color: ${({ isSelected, theme }) =>
		isSelected ? 'white' : theme.colors.neutral[600]};
	cursor: pointer;
	padding: 10px 15px;
	background: ${({ isSelected, isActive, theme }) => {
		if (isSelected) {
			return theme.colors.primary[200];
		}
		if (isActive && !isSelected) {
			return theme.colors.neutral[100];
		}
		return 'none';
	}};

	&:hover {
		background: ${({ isSelected, theme }) =>
			!isSelected && theme.colors.neutral[100]};
	}
	&:last-child {
		border-bottom: none;
	}
`;

export const InputWrapper = styled('div')`
	position: relative;
`;

export const IconPlacement = styled('div')`
	display: flex;
	align-items: center;
	position: absolute;
	background: white;
	top: 4px;
	right: 4px;
	width: 30px;
	height: 32px;
`;
