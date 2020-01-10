import React from 'react';
import DataBrowser, { DataBrowserProps } from '@alekna/react-data-browser';
import { Flex } from '@tpr/core';

type TableBaseProps = {
	fixedColWidth: number;
	status: string;
	data: object[];
	isLoading: boolean;
	numberOfLoadingRows: number | void;
	onTitleClick: Function;
	currentSort: object;
	[key: string]: any;
};

export const TableBase: React.FC<TableBaseProps & DataBrowserProps> = ({
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
			{utils => {
				return <Flex>this will be a re-usable table component</Flex>;
			}}
		</DataBrowser>
	);
};
