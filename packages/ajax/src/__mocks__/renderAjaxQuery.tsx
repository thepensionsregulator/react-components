import React from 'react';
import { AjaxProvider } from '../context';
import { useQuery } from '../ajaxQuery';
import { renderHook } from '@testing-library/react-hooks';
import { QueryProps } from '../ajaxQuery';
import { of, from } from 'rxjs';

const registryApi = {
	name: 'registry',
	instance: (method: string, query: any, headers: any) => {
		const uri = 'https://...';
		return from(
			Promise.resolve({ response: { data: [{ username: 'wolverine3000' }] } }),
		);
	},
};

const stores = [{ name: 'users', persist: false }];

const wrapper = ({ api, stores, children }) => (
	<AjaxProvider api={api} stores={stores}>
		{children}
	</AjaxProvider>
);

export default function renderAjaxQuery({
	endpoint,
	method,
	headers,
	variables,
	store,
	dataPath,
	errorPath,
}: Partial<QueryProps> = {}) {
	const renderArg = renderHook(
		() =>
			useQuery({
				endpoint,
				method,
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
