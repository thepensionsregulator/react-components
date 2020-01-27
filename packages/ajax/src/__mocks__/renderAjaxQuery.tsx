import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { AjaxProvider } from '../context';
import { AjaxQuery, useQuery } from '../ajaxQuery';
import { NetworkStatus } from '../reducer';
import { renderHook } from '@testing-library/react-hooks';

const registryApi = {
	name: 'registry',
	instance: (method: string, query: any, headers: any) => {
		const uri = 'https://...';
		return {
			toPromise: () => {
				return new Promise(res =>
					res({
						response: { data: [{ username: 'wolverine3000' }] },
					}),
				);
			},
		};
	},
};

const stores = [{ name: 'users', persist: false }];

type RenderAjaxQuery = Partial<{
	query: string;
	type: 'get' | 'post';
	headers: any;
	variables: any;
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

const wrapper = ({ api, stores, children }) => (
	<AjaxProvider api={api} stores={stores}>
		{children}
	</AjaxProvider>
);

export default function renderAjaxQuery({
	query,
	type,
	headers,
	variables,
	store,
	dataPath,
	errorPath,
}: RenderAjaxQuery = {}) {
	const renderArg = renderHook(
		() =>
			useQuery({
				query,
				type,
				headers,
				variables,
				store,
				dataPath,
				errorPath,
			}),
		{
			wrapper: ({ children }) => {
				return wrapper({ api: [registryApi], stores: stores, children });
			},
		},
	);

	return renderArg;
}
