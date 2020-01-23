import styled from 'styled-components';

export const StyledCard = styled('div')<{ complete?: boolean }>`
	display: flex;
	flex-direction: column;
	box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
	border: 1px solid #ddd;
	border-left: ${({ theme, complete }) =>
		`6px solid ${complete ? theme.colors.success[200] : theme.colors.danger[200]}`};
	/* TODO: temp margin for preview, remove later. */
	margin: 20px;
`;

export const StyledCardToolbar = styled('div')`
	display: flex;
	flex: 0 0 auto;
	justify-content: space-between;
	align-items: flex-end;
	height: 60px;
	padding: 0 20px;
`;

export const StyledCardContainer = styled('div')`
	padding: 0 20px 20px 20px;
`;
