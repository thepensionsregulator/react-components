import styled from 'styled-components';
import { flexbox } from 'styled-system';
import { FlexboxProps } from 'styled-system';

export const StyledFieldset = styled('fieldset')`
	border: none;

	legend {
		text-align: center;
	}
`;

export const ErrorMessage = styled('div')`
	display: flex;
	flex-direction: column;
	width: 100%;
	background: ${({ theme }) => theme.colors.danger[200]};
	border-radius: 4px;
	border: none;
	color: ${({ theme }) => theme.colors.danger[300]};
`;

export const FormLabelText = styled('div')`
	color: ${({ theme }) => theme.colors.neutral['800']};
	font-weight: 400;
	margin: 5px 0;
	white-space: nowrap;
`;

export const StyledLabel = styled('label')<FlexboxProps>`
	display: flex;
	margin: 0;
	padding: 0;
	cursor: pointer;

	${flexbox}
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
