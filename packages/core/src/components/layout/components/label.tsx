import React from 'react';
import { styled } from '@tpr/theming';

export const StyledLabel = styled('div')``;

export const Label: React.FC = ({ children }) => {
	return <StyledLabel>{children}</StyledLabel>;
};
