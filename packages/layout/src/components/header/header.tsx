import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div<{ bg?: string; color?: string }>`
	display: flex;
	flex: 0 0 auto;
	align-items: center;
	padding: 0 10px;
	width: 100%;
	height: 50px;
	color: ${({ color }) => (color ? color : 'black')};
	background: ${({ bg }) => (bg ? bg : 'grey')};
`;

type HeaderProps = {
	title: string;
	logo?: string;
	bg?: string;
	color?: string;
};

export const Header: React.FC<HeaderProps> = ({ title = 'TPR', logo, bg, color }) => {
	return (
		<StyledHeader bg={bg} color={color}>
			{logo && logo}
			{title}
		</StyledHeader>
	);
};
