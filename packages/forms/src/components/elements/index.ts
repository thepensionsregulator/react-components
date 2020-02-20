import styled from 'styled-components';
import { flexbox, space } from 'styled-system';
import { FlexboxProps, SpaceProps } from 'styled-system';

export const StyledFieldset = styled('fieldset')`
	border: none;

	legend {
		text-align: center;
	}
`;

export const ErrorMessage = styled('div')`
	color: ${({ theme }) => theme.colors.danger[300]};
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-weight: ${({ theme }) => theme.fontWeights[3]};
`;

export const FormLabelText = styled('div')<SpaceProps>`
	color: ${({ theme }) => theme.colors.neutral[900]};
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-weight: ${({ theme }) => theme.fontWeights[1]};
	margin: 5px 0;
	white-space: nowrap;

	${space}
`;

export const StyledLabel = styled('label')<FlexboxProps>`
	display: flex;
	flex: 1 1 auto;
	margin: 0;
	padding: 0;
	cursor: pointer;

	${flexbox}
`;

export const StyledInputLabel = styled(StyledLabel)<{ isError?: boolean }>`
	padding-left: ${({ isError }) => isError && '15px'};
	border-left: ${({ isError, theme }) =>
		isError && `4px solid ${theme.colors.danger[300]}`};
	cursor: default;
`;

type StyledHiddenInputProps = {
	checked: any;
};

export const StyledHiddenInput = styled('input')<StyledHiddenInputProps>`
	visibility: hidden;
	width: 0;
	height: 0;
`;

export const ElementPlaceholder = styled('div')`
	display: flex;
	flex: 0 0 auto;
	padding: ${({ theme }) => theme.space[0]}px;
	background-color: ${({ theme }) => theme.colors.neutral[100]};
`;
