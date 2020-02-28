import React, { ReactElement } from 'react';
import DataBrowser, { DataBrowserProps } from '@alekna/react-data-browser';
import { TableContainer, TableHead, TableHeadRowItem } from './styles';
import { TableListProps, TableList } from './views/table';
import { H3 } from '@tpr/core';

type TableBaseProps<T> = {
	/** fixed column width for the first and last items in the row */
	fixedColW?: number;
	data: T | T[];
	error?: any;
	loading?: boolean;
	networkStatus?: any;
	children: (utils: TableListProps<T>) => ReactElement;
};

const views = ['list', 'error', 'loading', 'refetch', 'fetchMore'];
export const TableBase = <T extends {}, K extends DataBrowserProps & TableBaseProps<T>>({
	fixedColW = 100,
	data,
	children,
	networkStatus,
	error,
	loading = false,
	...dataBrowserProps
}: K) => {
	const renderBody = tableBody({ fixedColW, data, networkStatus, error, loading });
	return (
		<DataBrowser views={views} viewType="loading" {...dataBrowserProps}>
			{dbUtils => (
				<TableContainer>
					<TableHead>
						{dbUtils.visibleColumns.map((cell, index) => {
							return (
								<TableHeadRowItem
									key={index}
									flex={dbUtils.columnFlex[index]}
									isClickable={cell.sortByFieldName}
									onClick={() => cell.sortByFieldName && console.log(cell)}
								>
									<H3 color="neutral.400" fontWeight={2}>
										{cell.label}
									</H3>
								</TableHeadRowItem>
							);
						})}
						{fixedColW && <TableHeadRowItem flex="0 0 auto" style={{ width: fixedColW }} />}
					</TableHead>
					{children(renderBody({ data, ...dbUtils }))}
				</TableContainer>
			)}
		</DataBrowser>
	);
};

/** This function will manage Apollo data fetching states and renders the body accordingly */
const tableBody = <T extends {}>({
	loading,
	error,
	networkStatus,
	...baseUtils
}: Omit<TableBaseProps<T>, 'children'>): Function => {
	// could have a state machine to control body states

	return (dbProps: DataBrowserProps) => (tlProps: TableListProps<T>): ReactElement => {
		if (loading) return <div>loading</div>;
		if (error) return <div>error</div>;
		if (networkStatus === 3) return <div>fetch more in progress</div>;
		if (networkStatus === 4) return <div>refetch in progress</div>;

		// loading = 1,
		// setVariables = 2,
		// fetchMore = 3,
		// refetch = 4,
		// poll = 6,
		// ready = 7,
		// error = 8

		return <TableList {...baseUtils} {...dbProps} {...tlProps} />;
	};
};
