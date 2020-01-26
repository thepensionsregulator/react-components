import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { AjaxProvider } from '../context';
import { AjaxQuery } from '../ajaxQuery';

const registryApi = {
	name: 'registry',
	instance: jest.fn(),
};

const stores = [{ name: 'users', persist: false }];

describe('AjaxQuery', () => {
	test('it renders correctly', () => {
		const { getByText } = renderAjaxQuery({
			query: 'users',
			type: 'get',
			store: 'users',
		});
	});

	expect(true).toBeTruthy();
});

// TODO: move to __mocks__
function renderAjaxQuery({
	render: renderFn = (_: any) => <div />,
	query = 'users',
	type = 'get',
	headers,
	params,
	store,
	dataPath,
	errorPath,
}: any = {}) {
	let renderArg;
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

	return { childrenSpy, ...utils, ...renderArg };
}
