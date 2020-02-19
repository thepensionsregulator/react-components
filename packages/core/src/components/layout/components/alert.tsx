import React from 'react';
import styled from 'styled-components';

// TODO: alert with like buttons theme colours
export const StyledAlert = styled('div')``;
export const Alert: React.FC = ({ children }) => {
	return <StyledAlert>{children}</StyledAlert>;
};
