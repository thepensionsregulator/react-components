import styled, { css } from 'styled-components';
import { flexbox, FlexProps } from 'styled-system';
import { FlexCol, FlexRow } from '../../styles';

export const RefetchingData = styled('div')`
	position: absolute;
	background: rgba(255, 255, 255, 0.3);
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 100;
`;

type TableBody = {
	maxBodyHeight?: number;
	/** ref for react ref usage */
	ref?: any;
};

export const TableBody = styled(FlexCol)<TableBody>`
	flex: 1 1 auto;
	position: relative;
	max-height: ${({ maxBodyHeight }) => maxBodyHeight && `${maxBodyHeight}px`};
	overflow: ${({ maxBodyHeight }) => maxBodyHeight && 'scroll'};
`;

type TableBodyRowProps = {
	isSelectable?: boolean;
	hoveredBgColor?: string;
};

export const TableBodyRow = styled(FlexRow).attrs(({ theme }) => ({
	hoveredBgColor: theme.colors.neutral['300'],
}))<TableBodyRowProps>`
	flex: 0 0 auto;
	border-bottom: 1px solid #eee;

	&:last-child {
		border-bottom: none;
	}
	&:hover {
		background: ${({ isSelectable, hoveredBgColor }) => isSelectable && hoveredBgColor};
	}
`;

type TableBodyRowItemProps = {
	isSelectable?: boolean;
	isChecked?: boolean;
	/** set row height */
	height?: number;
};

export const TableBodyRowItem = styled('div')<FlexProps & TableBodyRowItemProps>`
	display: flex;
	height: ${({ height }) => (height ? height : '100px')};
	align-items: center;
	justify-content: flex-start;
	padding: 0 ${({ theme }) => theme.spacing.padding / 2}px;
	font-size: ${({ theme }) => theme.fontSizes[1]}px;
	text-overflow: ellipsis;
	overflow-wrap: break-word;
	overflow: hidden;
	/* white-space: nowrap; */
	background: ${({ isChecked }) => (isChecked ? 'rgba(66,134,244,0.1)' : null)};
	cursor: ${({ isSelectable }) => (isSelectable ? 'pointer' : 'default')};

	${flexbox}
`;

export const BodyRowItemOptions = styled(TableBodyRowItem)`
	overflow: visible;
`;

type PlaceholderProps = {
	width: number;
	isLoading?: boolean;
};

export const Placeholder = styled(FlexRow)<PlaceholderProps>`
	flex: 0 1 auto;
	width: ${({ width }) => (width < 60 ? `${width}%` : '60%')};
	height: 20px;
	background: #f2f2f2;
	border-radius: 4px;

	${({ isLoading }) => {
		if (!isLoading) return null;
		return css`
			@keyframes move {
				0% {
					background-position: -268px 0;
				}
				100% {
					background-position: 268px 0;
				}
			}
			animation-duration: 1.2s;
			animation-fill-mode: forwards;
			animation-iteration-count: infinite;
			animation-name: move;
			animation-timing-function: linear;
			background: linear-gradient(0.35turn, #f2f2f2 8%, #ddd 18%, #f2f2f2 33%);
			background-size: 400px 20px;
			position: relative;
		`;
	}};
`;
