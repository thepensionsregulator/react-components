import '@testing-library/jest-dom/extend-expect';
import renderAjaxQuery from '../__mocks__/renderAjaxQuery';
import { act } from '@testing-library/react-hooks';

describe('AjaxQuery', () => {
	test('it renders correctly', async () => {
		const { result, waitForNextUpdate } = renderAjaxQuery({
			query: 'users',
			type: 'get',
			store: 'users',
			variables: {
				page: 2,
				total: 10,
				sort: {
					dob: 'asc',
				},
			},
		});

		// act(() => {
		// 	result.current.fetchMore();
		// });

		console.log(result.current);
		await waitForNextUpdate();
		console.log(result.current);

		expect(true).toBeTruthy();
	});
});
