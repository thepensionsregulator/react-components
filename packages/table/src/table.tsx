import React, { ReactElement } from 'react';
import DataBrowser, { DataBrowserProps } from '@alekna/react-data-browser';
import { NetworkStatus, ApolloError } from 'apollo-client';

// ISSUE: can't find a way to pass a generic to TableBaseProps when using React.FC 🤔

type TableBaseProps<T> = {
	/** fixed column width for the first and last items in the row */
	fixedColW: number;
	data: T | T[];
	error?: ApolloError;
	loading: boolean;
	networkStatus: NetworkStatus;
	children: (utils: ViewSwitchProps) => ReactElement;
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
	return (
		<DataBrowser views={views} viewType="loading" {...dataBrowserProps}>
			{dataBrowserUtils => {
				const renderBody = body({ fixedColW, data, networkStatus, error, loading });
				return (
					<div>
						<div>static table head</div>
						{children(renderBody(dataBrowserUtils))}
					</div>
				);
			}}
		</DataBrowser>
	);
};

type ViewSwitchProps = {
	fieldReducer: (fieldValue: unknown, fieldName: string, row: any) => ReactElement;
	onRowClick?: (row: any) => void;
	rowOptions?: (props: { toggleMenu: Function; row: any; history: any }) => ReactElement;
	onBottomTouch?: () => void;
	maxBodyHeight?: number;
	bottomTouchOffset?: number;
	emptyDataMessage?: string;
};

/** This function will manage Apollo data fetching states and renders the body accordingly */
const body = <T extends {}>({
	loading,
	error,
	networkStatus,
	...baseUtils
}: Omit<TableBaseProps<T>, 'children'>): Function => {
	// could have a state machine to control body states

	return (_: DataBrowserProps) => (_: ViewSwitchProps): ReactElement => {
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

		return <div>data is ready</div>;
	};
};
