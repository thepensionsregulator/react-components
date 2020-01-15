import React, { ReactElement } from 'react';
import { useDataBrowser, getBySortField } from '@alekna/react-data-browser';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { TableBody, TableBodyRow, TableBodyRowItem, RefetchingData } from './styles';
import { Flex, Text } from '@tpr/core';

export type TableListProps = {
	fieldReducer: (fieldValue: unknown, fieldName: string, row: any) => ReactElement;
	onRowClick?: (row: any) => void;
	rowOptions?: (props: { toggleMenu: Function; row: any; history: any }) => ReactElement;
	onBottomTouch?: () => void;
	fixedColW?: number;
	/** row options menu jsx */
	options?: (props: any) => ReactElement;
	isRefetching?: boolean;
	maxBodyHeight?: number;
	bottomTouchOffset?: number;
	emptyDataMessage?: string;
	rowHeight?: number;
	data: any;
};

export const TableList: React.FC<TableListProps> = ({
	isRefetching,
	fixedColW = 40,
	maxBodyHeight,
	options: Options,
	fieldReducer,
	data = [],
	onRowClick,
	onBottomTouch = () => {},
	bottomTouchOffset = 300,
	rowHeight,
	emptyDataMessage = `No data available yet... 🤷🏼‍♂️`,
}) => {
	const { visibleColumns, columnFlex } = useDataBrowser();
	const bodyRef = useBottomScrollListener(onBottomTouch, bottomTouchOffset);

	if (!data.length) {
		return (
			<Flex p={1} justifyContent="center" alignItems="center">
				<Text color="neutral.500">{emptyDataMessage}</Text>
			</Flex>
		);
	}

	return (
		<TableBody ref={bodyRef} maxBodyHeight={maxBodyHeight}>
			{isRefetching && <RefetchingData children={<div>loading spinner...</div>} />}
			{data.map((row, key) => (
				<TableBodyRow key={key} isSelectable={typeof onRowClick === 'function'}>
					{visibleColumns.map(({ sortField }, index) => (
						<TableBodyRowItem
							key={sortField}
							flex={columnFlex[index]}
							height={rowHeight}
							isSelectable={typeof onRowClick === 'function'}
							onClick={() => typeof onRowClick === 'function' && onRowClick(row)}
						>
							{fieldReducer(getBySortField(row, sortField), sortField, row)}
						</TableBodyRowItem>
					))}
					{fixedColW && (
						<TableBodyRowItem flex="0 0 auto" style={{ width: fixedColW }} children={<Options {...row} />} />
					)}
				</TableBodyRow>
			))}
		</TableBody>
	);
};
