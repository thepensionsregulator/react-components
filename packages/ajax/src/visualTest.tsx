import React from 'react';
import { AjaxProvider } from './context';
import { AjaxQuery } from './ajaxQuery';
import { ajax } from 'rxjs/ajax';

const ComponentOne = () => {
	return (
		<AjaxQuery
			type="get"
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
			{({ refetch, ...props }) => {
				console.log('component 1 triggered');
				return (
					<div>
						<button onClick={() => refetch()}>refetch</button>
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

const fakeInstance = () => {
	return ajax('https://jsonplaceholder.typicode.com/todos');
};

export const TestEntry = () => {
	return (
		<AjaxProvider
			api={[{ name: 'registry', instance: fakeInstance }]}
			stores={[{ name: 'users', persist: false }]}
		>
			<ComponentOne />
			<ComponentTwo />
		</AjaxProvider>
	);
};
