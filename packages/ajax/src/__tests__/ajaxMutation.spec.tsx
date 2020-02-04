import { useMutationSetup } from '../__mocks__/setup';
import { act } from '@testing-library/react-hooks';

describe('AjaxQuery', () => {
	test('it can post data', async () => {
		const { result, waitForNextUpdate } = useMutationSetup({
			props: {
				endpoint: 'articles',
				api: 'registry',
				dataPath: ['response', 'data'],
				errorPath: ['response', 'errors', 0],
			},
		});

		expect(result.current.loading).toBeFalsy();

		act(() => {
			result.current.mutate();
		});

		expect(result.current.loading).toBeTruthy();

		await waitForNextUpdate();

		expect(result.current.loading).toBeFalsy();
		expect(result.current.error).toBeUndefined();
		expect(result.current.data).toMatchInlineSnapshot(`
		Array [
		  Object {
		    "username": "wulfas50000",
		  },
		]
	`);
	});
});
