import React, { useState } from 'react';
import { AjaxProvider } from './context';
import { AjaxQuery } from './ajaxQuery';
import { ajax } from 'rxjs/ajax';
import { Flex, Button } from '@tpr/core';

const ComponentOne = () => {
	return (
		<AjaxQuery
			query="users"
			store="users"
			variables={{
				page: 2,
				total: 10,
				sort: {
					dob: 'asc',
				},
			}}
		>
			{({ refetch, fetchMore, ...props }) => {
				console.log('component 1 triggered');
				return (
					<div>
						<Flex bg="#eee" p={2} justifyContent="space-between">
							<Flex>
								<Button mr={0} onClick={() => refetch()}>
									refetch
								</Button>
								<Button onClick={() => fetchMore({ page: 3, total: 20 })}>
									fetchMore
								</Button>
							</Flex>
							<Flex>
								<div>
									{props.networkStatus === 1 && 'initializing'}
									{props.networkStatus === 2 && 'setting variables'}
									{props.networkStatus === 3 && 'fetch more'}
									{props.networkStatus === 4 && 're-fetching'}
									{props.networkStatus === 7 && 'fetch success'}
									{props.networkStatus === 8 && 'fetch failed'}
								</div>
								<Flex mr={0}>total: {props.data.length}</Flex>
							</Flex>
						</Flex>
						<pre>{JSON.stringify(props, undefined, 2)}</pre>
					</div>
				);
			}}
		</AjaxQuery>
	);
};

const ComponentTwo = () => {
	console.log('component 2 triggered');
	return null;
};

const ComponentThree = () => {
	const [open, setOpen] = useState(false);
	console.log('component 3 triggered');
	/** CURRENT ERROR: data is being refetch from network rather than already stored in memory. Fix that */
	return (
		<>
			<button onClick={() => setOpen(!open)}>open copy</button>
			{open ? <ComponentOne /> : null}
		</>
	);
};

const fakeInstance = () => {
	return ajax({
		method: 'get',
		url: 'https://jsonplaceholder.typicode.com/todos',
	});
};

const getItemFromStorage = key => {
	if (!localStorage) return;

	try {
		return JSON.parse(localStorage.getItem(key));
	} catch (err) {
		console.error(`Error getting item ${key} from localStoragee`, err);
	}
};

export const TestEntry = () => {
	return (
		<AjaxProvider
			api={[{ name: 'registry', instance: fakeInstance }]}
			stores={[{ name: 'users', persist: false }]}
			// initialState={getItemFromStorage('tpr')}
		>
			<ComponentOne />
			<ComponentTwo />
			<ComponentThree />
		</AjaxProvider>
	);
};
