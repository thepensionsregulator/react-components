import React, { ReactNode } from 'react';
import { AjaxProvider } from '../context';
import { useQuery } from '../ajaxQuery';
import { renderHook, HookResult } from '@testing-library/react-hooks';
import { QueryProps } from '../ajaxQuery';
import { from } from 'rxjs';

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

const provider = ({ api, stores, children }) => (
	<AjaxProvider api={api} stores={stores}>
		{children}
	</AjaxProvider>
);

export function useQuerySetup({ props }: Partial<{ props: QueryProps }> = {}) {
	const renderArg = renderHook(useQuery, {
		initialProps: props,
		wrapper: ({ children }) => {
			return provider({ api: [registryApi], stores, children });
		},
	});

	return renderArg;
}
