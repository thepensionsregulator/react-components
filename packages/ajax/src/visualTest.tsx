import React, { useState } from 'react';
import { AjaxProvider } from './context';
import { AjaxQuery, useQuery } from './ajaxQuery';
import { ajax } from 'rxjs/ajax';
import { Flex, Button } from '@tpr/core';
import { getItemFromStorage } from './localStorage';
import { timeout, retryWhen, catchError } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { genericRetryStrategy } from './retryStrategy';
import { pathOr } from 'ramda';
import { useMutation } from './ajaxMutation';

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
								<Flex>
									networkStatus:
									<Flex ml={0}>
										{props.networkStatus === 1 && 'initializing'}
										{props.networkStatus === 2 && 'setting variables'}
										{props.networkStatus === 3 && 'fetch more'}
										{props.networkStatus === 4 && 're-fetching'}
										{props.networkStatus === 7 && 'fetch success'}
										{props.networkStatus === 8 && 'fetch failed'}
									</Flex>
								</Flex>
								<Flex ml={0}>total: {props.data?.results?.length}</Flex>
							</Flex>
						</Flex>
						<Flex style={{ position: 'relative' }}>
							{props.loading && (
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										position: 'absolute',
										width: '100%',
										height: '100%',
										background: 'rgba(255,255,255,0.5)',
									}}
								>
									Loading...
								</div>
							)}
							<pre>{JSON.stringify(props, undefined, 2)}</pre>
						</Flex>
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
		mergeData: (parent, next) => {
			return {
				...next,
				results: [...parent.results, ...next.results],
			};
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
					<Flex>
						networkStatus:
						<Flex ml={0}>
							{props.networkStatus === 1 && 'initializing'}
							{props.networkStatus === 2 && 'setting variables'}
							{props.networkStatus === 3 && 'fetch more'}
							{props.networkStatus === 4 && 're-fetching'}
							{props.networkStatus === 7 && 'fetch success'}
							{props.networkStatus === 8 && 'fetch failed'}
						</Flex>
					</Flex>
					<Flex ml={0}>total: {props.data?.results?.length}</Flex>
				</Flex>
			</Flex>
			<Flex style={{ position: 'relative' }}>
				{props.loading && (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							position: 'absolute',
							width: '100%',
							height: '100%',
							background: 'rgba(255,255,255,0.5)',
						}}
					>
						Loading...
					</div>
				)}
				<pre>{JSON.stringify(props, undefined, 2)}</pre>
			</Flex>
		</div>
	);
};

const UpdateComponent = () => {
	const { loading, mutate } = useMutation({
		endpoint: 'articles',
		api: 'localPromise',
		dataPath: ['response', 'results'],
		errorPath: ['response', 'errors', 0],
	});

	return (
		<Flex>
			<Button
				onClick={() =>
					mutate({
						refetchStores: ['people', 'planets'],
					})
				}
				disabled={loading}
			>
				{loading ? 'MUTATING...' : 'MUTATION UPDATE'}
			</Button>
		</Flex>
	);
};

const starWarsInstance = ({ endpoint, method, send, errorPath }) => {
	return ajax({
		method: method,
		url: `https://swapi.co/api/${endpoint}`,
	}).pipe(
		retryWhen(
			genericRetryStrategy({
				maxRetryAttempts: 3,
				excludedStatusCodes: [500],
			}),
		),
		catchError(err => {
			const getError = pathOr('unknown error occurred', errorPath);
			send({
				networkStatus: 8,
				data: undefined,
				loading: false,
				error: getError(err),
			});
			return throwError(getError(err));
		}),
		timeout(10000),
	);
};

const retryTestInstance = (timeout = 5000) => {
	const success = (ms: number = 0) =>
		new Promise(res =>
			setTimeout(
				() => res({ response: { results: [{ name: 'wulfass3000' }] } }),
				ms,
			),
		);

	const failure = (ms: number = 0) =>
		new Promise((_, rej) =>
			setTimeout(() => rej(new Error('MOCKED FAILURE')), ms),
		);

	return ({ send, errorPath }) => {
		return from(success(5000)).pipe(
			retryWhen(
				genericRetryStrategy({
					maxRetryAttempts: 3,
					scalingDuration: 3000,
					excludedStatusCodes: [500],
				}),
			),
			/** Catch a error if there was any, extract it from the object
			 * and pass it on to the store to notify client */
			catchError(err => {
				const getError = pathOr('unknown error occurred', errorPath);
				send({
					networkStatus: 8,
					data: undefined,
					loading: false,
					error: getError(err),
				});
				return throwError(getError(err));
			}),
		);
	};
};

export const TestEntry = () => {
	return (
		<AjaxProvider
			api={[
				{ name: 'starwars', instance: starWarsInstance },
				{ name: 'localPromise', instance: retryTestInstance() },
			]}
			stores={[
				{ name: 'planets', persist: false },
				{ name: 'people', persist: false },
			]}
			// initialState={getItemFromStorage('tpr')}
			// persistOn="tpr"
		>
			<UpdateComponent />
			<People />
			{/* <ComponentTwo /> */}
			<ComponentThree />
			<Planets />
		</AjaxProvider>
	);
};
