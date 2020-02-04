import React, { useState } from 'react';
import { AjaxProvider } from './context';
import { AjaxQuery, useQuery } from './ajaxQuery';
import { ajax } from 'rxjs/ajax';
import { Flex, Button } from '@tpr/core';
import { getItemFromStorage } from './localStorage';
import { timeout } from 'rxjs/operators';

const People = () => {
	return (
		<AjaxQuery
			endpoint="people/"
			store="people"
			dataPath={['response']}
			variables={{
				page: 1,
			}}
			mergeData={(parent, next) => {
				return {
					...next,
					results: [...parent.results, ...next.results],
				};
			}}
		>
			{({ refetch, fetchMore, ...props }) => {
				console.log('people 1');
				return (
					<div>
						<Flex bg="#eee" p={2} justifyContent="space-between">
							<Flex>
								<Button mr={0} onClick={() => refetch()}>
									refetch
								</Button>
								<Button
									onClick={() => fetchMore(vars => ({ page: vars.page + 1 }))}
								>
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
								<Flex mr={0}>total: {props.data?.results?.length}</Flex>
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
	console.log('component 2');
	return <People />;
};

const ComponentThree = () => {
	const [open, setOpen] = useState(false);
	console.log('component 3');
	/** CURRENT ERROR: data is being refetch from network rather than already stored in memory. Fix that */
	return (
		<>
			<button onClick={() => setOpen(!open)}>open copy</button>
			{open ? <Planets /> : null}
		</>
	);
};

const Planets = () => {
	console.log('planets 4');
	const { refetch, fetchMore, ...props } = useQuery({
		endpoint: 'planets/',
		store: 'planets',
		dataPath: ['response'],
		variables: {
			page: 2,
		},
	});

	return (
		<div>
			<Flex bg="#eee" p={2} justifyContent="space-between">
				<Flex>
					<Button mr={0} onClick={() => refetch()}>
						refetch
					</Button>
					<Button onClick={() => fetchMore(vars => ({ page: vars.page + 1 }))}>
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
					<Flex mr={0}>total: {props.data?.length}</Flex>
				</Flex>
			</Flex>
			<pre>{JSON.stringify(props, undefined, 2)}</pre>
		</div>
	);
};

const fakeInstance = dispatch => (method, { endpoint }) => {
	return ajax({
		method: method,
		url: `https://swapi.co/api/${endpoint}`,
	}).pipe(timeout(10000));
};

export const TestEntry = () => {
	return (
		<AjaxProvider
			api={[{ name: 'registry', instance: fakeInstance }]}
			stores={[
				{ name: 'planets', persist: false },
				{ name: 'people', persist: false },
			]}
			// initialState={getItemFromStorage('tpr')}
			// persistOn="tpr"
		>
			<People />
			<ComponentTwo />
			<ComponentThree />
		</AjaxProvider>
	);
};
