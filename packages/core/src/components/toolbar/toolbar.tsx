import React from 'react';
import styled from 'styled-components';

const StyledToolbar = styled.div<{ bg?: string; color?: string }>`
	display: flex;
	flex: 0 0 auto;
	align-items: center;
	padding: 0 10px;
	width: 100%;
	height: 50px;
	color: ${({ color }) => (color ? color : 'black')};
	background: ${({ bg }) => (bg ? bg : 'grey')};
`;

type ToolbarProps = {
	title: string;
	logo?: string;
	bg?: string;
	color?: string;
};

export const Toolbar: React.FC<ToolbarProps> = ({ title = 'TPR', logo, bg, color }) => {
	return (
		<StyledToolbar bg={bg} color={color}>
			{logo && logo}
			{title}
		</StyledToolbar>
	);
};
