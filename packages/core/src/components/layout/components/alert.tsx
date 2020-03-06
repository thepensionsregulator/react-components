import React from 'react';
import { styled } from '@tpr/theming';

// TODO: alert with like buttons theme colours
export const StyledAlert = styled('div')``;
export const Alert: React.FC = ({ children }) => {
	return <StyledAlert>{children}</StyledAlert>;
};
