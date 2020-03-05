import styled from 'styled-components';

interface StyledSelectProps {
	meta?: any;
	padding?: number;
}
export const StyledSelect = styled('input')<StyledSelectProps>`
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

export const Popup = styled('div')`
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
	border-radius: 3px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	margin-top: 2px;
	z-index: 10;
	overflow-x: auto;
	user-select: none;
	padding: ${({ theme }) => theme.spacing.padding / 4}px;
`;

type PopupButtonProps = {
	isActive?: boolean;
	isSelected?: boolean;
	isClickable?: boolean;
};
export const PopupButton = styled('button')<PopupButtonProps>`
	width: 100%;
	text-align: left;
	font-size: ${({ theme }) => theme.fontSizes[1]}px;
	color: ${({ theme }) => theme.colors.neutral[300]};
	font-weight: 400;
	border: none;
	border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[400]};
	background: ${({ isActive, isSelected }) => {
		if (isActive || isSelected) {
			return '#eee';
		}
		return 'none';
	}};
	&:hover {
		background: #eaeaea;
	}
	&:last-child {
		border-bottom: none;
	}
`;
