import React from 'react';
import DataBrowser, { DataBrowserProps } from '@alekna/react-data-browser';
import { Flex } from '@tpr/core';

type TableBaseProps<T = object> = {
	fixedColWidth: number;
	status: string;
	data: T[];
	isLoading: boolean;
};

// ISSUE: can't find a way to pass a generic to TableBaseProps when using React.FC 🤔

export const TableBase: React.FC<DataBrowserProps & TableBaseProps> = ({
	fixedColWidth = 40,
	status,
	data,
	children,
	isLoading = false,
	...dataBrowserProps
}) => {
	const views = ['list', 'grid', 'loading', 'refetching'];
	return (
		<DataBrowser views={views} viewType={'loading'} {...dataBrowserProps}>
			{utils => {
				console.log(utils);
				return <Flex>this will be a re-usable table component</Flex>;
			}}
		</DataBrowser>
	);
};
