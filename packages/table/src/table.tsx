import React, { ReactElement } from 'react';
import DataBrowser, { DataBrowserProps } from '@alekna/react-data-browser';

// ISSUE: can't find a way to pass a generic to TableBaseProps when using React.FC 🤔

type TableBaseProps<T = object> = {
	fixedColW: number;
	status: 'pending' | 'idle' | 'refetching' | 'success' | 'failure';
	data: T[];
	isLoading: boolean;
	children: any;
};

export const TableBase: React.FC<DataBrowserProps & TableBaseProps> = ({
	fixedColW = 40,
	status,
	data,
	children,
	isLoading = false,
	...dataBrowserProps
}) => {
	const views = ['list', 'grid', 'loading', 'refetching'];
	return (
		<DataBrowser views={views} viewType="loading" {...dataBrowserProps}>
			{dataBrowserUtils => {
				return (
					<div>
						<div>static table head</div>
						{children(prepareRenderer({ status, isLoading, data, fixedColW, ...dataBrowserUtils }))}
					</div>
				);
			}}
		</DataBrowser>
	);
};

type ViewSwitchProps<T = string> = {
	fieldReducer: (fieldValue: unknown, fieldName: T, row: any) => ReactElement;
	onRowClick?: (row: any) => void;
	rowOptions?: (props: { toggleMenu: Function; row: any; history: any }) => ReactElement;
	onBottomTouch?: () => void;
	fixedColW?: number;
	refetching?: boolean;
	maxBodyHeight?: number;
	data: any;
	bottomTouchOffset?: number;
	emptyDataMessage?: string;
};

const prepareRenderer = ({ isLoading, status }: Partial<TableBaseProps>): Function => {
	return (_: ViewSwitchProps): ReactElement => {
		if (isLoading) return <div>pending</div>;

		switch (status) {
			case String(status.match(new RegExp(`^pending|idle`))):
				return <div>loading</div>;
			case String(status.match(new RegExp(`^refetching|success`))):
				return <div>table list ready to be rendered</div>;
			default:
				return null;
		}
	};
};
