import React, { ReactElement } from 'react';
import DataBrowser, { DataBrowserProps } from '@alekna/react-data-browser';
import { NetworkStatus, ApolloError } from 'apollo-client';
import { TableContainer, TableHead, TableHeadRowItem } from './styles';
import { TableListProps, TableList } from './views/table';
import { H6 } from '@tpr/core';

// ISSUE: can't find a way to pass a generic to TableBaseProps when using React.FC 🤔

type TableBaseProps<T> = {
	/** fixed column width for the first and last items in the row */
	fixedColW: number;
	data: T | T[];
	error?: ApolloError;
	loading: boolean;
	networkStatus: NetworkStatus;
	children: (utils: TableListProps) => ReactElement;
};

const views = ['list', 'error', 'loading', 'refetch', 'fetchMore'];
export const TableBase = <T extends {}, K extends DataBrowserProps & TableBaseProps<T>>({
	fixedColW = 40,
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
									<H6 color="neutral.200" fontWeight={2}>
										{cell.label}
									</H6>
								</TableHeadRowItem>
							);
						})}
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

	return (dbProps: DataBrowserProps) => (tlProps: TableListProps): ReactElement => {
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
