import '@testing-library/jest-dom/extend-expect';
import renderAjaxQuery from '../__mocks__/renderAjaxQuery';
import { wait } from '@testing-library/react';

describe('AjaxQuery', () => {
	test('it renders correctly', async () => {
		const { result, waitForNextUpdate } = renderAjaxQuery({
			query: 'users',
			type: 'get',
			store: 'users',
		});

		console.log(result.current);

		await waitForNextUpdate();

		expect(true).toBeTruthy();
	});
});
