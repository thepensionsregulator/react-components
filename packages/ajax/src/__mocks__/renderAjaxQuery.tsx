import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { AjaxProvider } from '../context';
import { AjaxQuery } from '../ajaxQuery';
import { NetworkStatus } from '../reducer';
import { ajax } from 'rxjs/ajax';

const registryApi = {
	name: 'registry',
	instance: jest.fn((method: string, q: any, headers: any) => {
		return {
			toPromise: () => {
				return Promise.resolve({
					response: { data: [{ username: 'wolverine3000' }] },
				});
				// return new Promise(resolve => {
				// 	process.nextTick(() =>
				// 		resolve({ data: [{ username: 'wolverine3000' }] }),
				// 	);
				// });
			},
		};
	}),
};

const stores = [{ name: 'users', persist: false }];

type RenderAjaxQuery = Partial<{
	render: Function;
	query: string;
	type: 'get' | 'post';
	headers: any;
	params: any;
	store: string;
	dataPath: string[];
	errorPath: string[];
}>;

type RenderArgsProps = Partial<{
	data: any;
	loading: boolean;
	error: string | void;
	variables: any;
	networkStatus: NetworkStatus;
	fetchMore: Function;
	refetch: Function;
}>;

export default function renderAjaxQuery({
	render: renderFn = (_: any) => <div />,
	query = 'users',
	type = 'get',
	headers,
	params,
	store,
	dataPath,
	errorPath,
}: RenderAjaxQuery = {}): [RenderResult, RenderArgsProps, any] {
	let renderArg: RenderArgsProps;
	const childrenSpy = jest.fn(controllerArg => {
		renderArg = controllerArg;
		return renderFn(controllerArg);
	});

	const utils = render(
		<AjaxProvider api={[registryApi]} stores={stores}>
			<AjaxQuery
				query={query}
				type={type}
				headers={headers}
				params={params}
				store={store}
				dataPath={dataPath}
				errorPath={errorPath}
			>
				{childrenSpy}
			</AjaxQuery>
		</AjaxProvider>,
	);

	return [utils, renderArg, childrenSpy];
}
