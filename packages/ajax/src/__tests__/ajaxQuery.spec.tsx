import { useQuerySetup } from '../__mocks__/setup';
import { act } from '@testing-library/react-hooks';

// NOTE: can't test networkStatus 1 for some reason.

describe('AjaxQuery', () => {
	test('it can refetch the data with setting correct status values', async () => {
		const variables = {
			page: 2,
			total: 10,
			sort: {
				dob: 'asc',
			},
		};

		const { result, waitForNextUpdate } = useQuerySetup({
			props: {
				endpoint: 'registry',
				store: 'users',
				variables,
				dataPath: ['response', 'data'],
			},
		});

		expect(result.current.data).toBeUndefined();
		expect(result.current.networkStatus).toEqual(2);
		expect(result.current.variables).toEqual(variables);
		await waitForNextUpdate();
		expect(result.current.networkStatus).toEqual(7);
		act(() => {
			result.current.refetch();
		});
		expect(result.current.networkStatus).toEqual(4);
		await waitForNextUpdate();
		expect(result.current.networkStatus).toEqual(7);
	});

	test('it can fetchMore data with setting correct status values', async () => {
		const { result, waitForNextUpdate } = useQuerySetup({
			props: {
				endpoint: 'registry',
				store: 'users',
				variables: {
					page: 2,
					total: 10,
					sort: {
						dob: 'asc',
					},
				},
				dataPath: ['response', 'data'],
			},
		});

		expect(result.current.networkStatus).toEqual(2);
		await waitForNextUpdate();
		expect(result.current.networkStatus).toEqual(7);
		expect(result.current).toMatchInlineSnapshot(`
		Object {
		  "data": Array [
		    Object {
		      "username": "wolverine3000",
		    },
		  ],
		  "error": undefined,
		  "fetchMore": [Function],
		  "loading": false,
		  "networkStatus": 7,
		  "refetch": [Function],
		  "variables": Object {
		    "page": 2,
		    "sort": Object {
		      "dob": "asc",
		    },
		    "total": 10,
		  },
		}
	`);
		act(() => {
			result.current.fetchMore(({ page }) => ({ page: page + 1 }));
		});
		expect(result.current.networkStatus).toEqual(3);
		await waitForNextUpdate();
		expect(result.current.networkStatus).toEqual(7);
		expect(result.current).toMatchInlineSnapshot(`
		Object {
		  "data": Array [
		    Object {
		      "username": "wolverine3000",
		    },
		    Object {
		      "username": "wolverine3000",
		    },
		  ],
		  "error": undefined,
		  "fetchMore": [Function],
		  "loading": false,
		  "networkStatus": 7,
		  "refetch": [Function],
		  "variables": Object {
		    "page": 3,
		    "sort": Object {
		      "dob": "asc",
		    },
		    "total": 10,
		  },
		}
	`);
	});

	test('it loads data correctly', async () => {
		const { result, waitForNextUpdate } = useQuerySetup({
			props: {
				endpoint: 'registry',
				store: 'users',
				variables: {
					page: 2,
					total: 10,
					sort: {
						dob: 'asc',
					},
				},
				dataPath: ['response', 'data'],
			},
		});

		expect(result.current).toMatchInlineSnapshot(`
		Object {
		  "data": undefined,
		  "error": undefined,
		  "fetchMore": [Function],
		  "loading": true,
		  "networkStatus": 2,
		  "refetch": [Function],
		  "variables": Object {
		    "page": 2,
		    "sort": Object {
		      "dob": "asc",
		    },
		    "total": 10,
		  },
		}
	`);

		await waitForNextUpdate();

		expect(result.current).toMatchInlineSnapshot(`
		Object {
		  "data": Array [
		    Object {
		      "username": "wolverine3000",
		    },
		  ],
		  "error": undefined,
		  "fetchMore": [Function],
		  "loading": false,
		  "networkStatus": 7,
		  "refetch": [Function],
		  "variables": Object {
		    "page": 2,
		    "sort": Object {
		      "dob": "asc",
		    },
		    "total": 10,
		  },
		}
	`);
	});
});
