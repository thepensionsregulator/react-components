import React from 'react';
import DataBrowser from '@alekna/react-data-browser';
import { Flex } from '@tpr/core';

// TODO: export typescript types from @alekna/react-data-browser

type TableBaseProps = {
	fixedColWidth: number;
	columns: object[];
	totalItems: number;
	status: string;
	data: object[];
	isLoading: boolean;
	numberOfLoadingRows: number | void;
	onTitleClick: Function;
	currentSort: object;
	[key: string]: any;
};

export const TableBase: React.FC<TableBaseProps> = ({
	fixedColWidth = 40,
	columns,
	totalItems,
	status,
	data,
	children,
	isLoading = false,
	numberOfLoadingRows = undefined,
	onTitleClick = () => {},
	currentSort = {},
	...rest
}) => {
	return (
		<DataBrowser
			columns={columns}
			totalItems={totalItems}
			views={['list', 'grid', 'loading', 'refetching']}
			viewType={'loading'}
			{...rest}
		>
			{() => {
				return <Flex>this will be a re-usable table component</Flex>;
			}}
		</DataBrowser>
	);
};
