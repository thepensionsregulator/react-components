import styled from 'styled-components';
import { flexbox, FlexboxProps } from 'styled-system';

export const FlexRow = styled('div')`
	display: flex;
	flex-direction: row;
`;

export const FlexCol = styled('div')`
	display: flex;
	flex-direction: column;
`;

export const TableContainer = styled(FlexCol)`
	font-family: ${({ theme }) => theme.fonts.montserrat};
	position: relative;
	width: 100%;
	border: 1px solid #eee;
`;

export const TableHead = styled(FlexRow)`
	flex: 0 0 auto;
	height: 46px;
	border-bottom: 1px solid #ddd;
	user-select: none;
`;

type TableHeadRowItemProps = {
	isClickable?: boolean;
};

export const TableHeadRowItem = styled(FlexRow)<TableHeadRowItemProps & FlexboxProps>`
	text-transform: uppercase;
	align-items: center;
	justify-content: space-between;
	padding: 15px;
	cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};

	${flexbox}
`;
