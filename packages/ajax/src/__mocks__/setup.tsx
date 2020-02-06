import React from 'react';
import { AjaxProvider } from '../context';
import { useQuery, QueryProps } from '../ajaxQuery';
import { useMutation, MutationProps } from '../ajaxMutation';
import { renderHook } from '@testing-library/react-hooks';
import { from } from 'rxjs';

const registryApi = ({ returnData }) => ({
	name: 'registry',
	instance: ({}: any) => {
		const uri = 'https://...';
		return from(Promise.resolve({ response: { data: returnData } }));
	},
});

const stores = [{ name: 'users', persist: false }];

const provider = ({ api, stores, children, initialState }: any) => (
	<AjaxProvider api={api} stores={stores} initialState={initialState}>
		{children}
	</AjaxProvider>
);

export function useQuerySetup({ props }: Partial<{ props: QueryProps }> = {}) {
	const renderArg = renderHook(useQuery, {
		initialProps: props,
		wrapper: ({ children }) => {
			return provider({
				api: [registryApi({ returnData: [{ username: 'wolverine3000' }] })],
				stores,
				children,
			});
		},
	});

	return renderArg;
}

export function useMutationSetup({ props }: { props?: MutationProps } = {}) {
	const renderArg = renderHook(useMutation, {
		initialProps: props,
		wrapper: ({ children }) => {
			return provider({
				api: [registryApi({ returnData: [{ username: 'wulfas50000' }] })],
				stores,
				children,
				initialState: {
					users: {
						data: [{ username: 'wolverine3000' }],
						loading: true,
						error: undefined,
						variables: undefined,
						networkStatus: 7,
					},
				},
			});
		},
	});

	return renderArg;
}
