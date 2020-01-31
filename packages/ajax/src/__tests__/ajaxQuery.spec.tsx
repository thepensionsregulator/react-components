import '@testing-library/jest-dom/extend-expect';
import renderAjaxQuery from '../__mocks__/renderAjaxQuery';
import { act } from '@testing-library/react-hooks';

describe('AjaxQuery', () => {
	test('it renders first 2 stages', async () => {
		const { result, waitForNextUpdate } = renderAjaxQuery({
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
		});

		console.log(result.current.networkStatus);
		await waitForNextUpdate();
		console.log(result.current.networkStatus);

		// await waitForValueToChange(() => console.log(result.current.networkStatus));
		console.log(result.current.networkStatus);

		expect(result.current.networkStatus).toEqual(1);
		expect(result.current.networkStatus).toEqual(2);
	});

	// test('it can refetch the data with setting correct status values', async () => {
	// 	const { result, waitForNextUpdate, rerender } = renderAjaxQuery({
	// 		endpoint: 'registry',
	// 		store: 'users',
	// 		variables: {
	// 			page: 2,
	// 			total: 10,
	// 			sort: {
	// 				dob: 'asc',
	// 			},
	// 		},
	// 		dataPath: ['response', 'data'],
	// 	});

	// 	expect(result.current.networkStatus).toEqual(1);
	// 	expect(result.current.networkStatus).toEqual(2);
	// 	await waitForNextUpdate();
	// 	expect(result.current.networkStatus).toEqual(7);
	// 	act(() => {
	// 		result.current.refetch();
	// 	});
	// 	expect(result.current.networkStatus).toEqual(4);
	// 	await waitForNextUpdate();
	// 	expect(result.current.networkStatus).toEqual(7);
	// });

	// test('it can fetchMore data with setting correct status values', async () => {
	// 	const { result, waitForNextUpdate } = renderAjaxQuery({
	// 		endpoint: 'registry',
	// 		store: 'users',
	// 		variables: {
	// 			page: 2,
	// 			total: 10,
	// 			sort: {
	// 				dob: 'asc',
	// 			},
	// 		},
	// 		dataPath: ['response', 'data'],
	// 	});

	// 	expect(result.current.networkStatus).toEqual(1);
	// 	await waitForNextUpdate();
	// 	expect(result.current.networkStatus).toEqual(7);
	// 	expect(result.current).toMatchInlineSnapshot(`
	// 	Object {
	// 	  "data": Array [
	// 	    Object {
	// 	      "username": "wolverine3000",
	// 	    },
	// 	  ],
	// 	  "error": undefined,
	// 	  "fetchMore": [Function],
	// 	  "loading": false,
	// 	  "networkStatus": 7,
	// 	  "refetch": [Function],
	// 	  "variables": Object {
	// 	    "page": 2,
	// 	    "sort": Object {
	// 	      "dob": "asc",
	// 	    },
	// 	    "total": 10,
	// 	  },
	// 	}
	// `);
	// 	act(() => {
	// 		result.current.fetchMore();
	// 	});
	// 	expect(result.current.networkStatus).toEqual(3);
	// 	await waitForNextUpdate();
	// 	expect(result.current.networkStatus).toEqual(7);
	// 	expect(result.current).toMatchInlineSnapshot(`
	// 	Object {
	// 	  "data": Array [
	// 	    Object {
	// 	      "username": "wolverine3000",
	// 	    },
	// 	    Object {
	// 	      "username": "wolverine3000",
	// 	    },
	// 	  ],
	// 	  "error": undefined,
	// 	  "fetchMore": [Function],
	// 	  "loading": false,
	// 	  "networkStatus": 7,
	// 	  "refetch": [Function],
	// 	  "variables": Object {
	// 	    "page": 2,
	// 	    "sort": Object {
	// 	      "dob": "asc",
	// 	    },
	// 	    "total": 10,
	// 	  },
	// 	}
	// `);
	// });

	// test('it loads data correctly', async () => {
	// 	const { result, waitForNextUpdate } = renderAjaxQuery({
	// 		endpoint: 'registry',
	// 		store: 'users',
	// 		variables: {
	// 			page: 2,
	// 			total: 10,
	// 			sort: {
	// 				dob: 'asc',
	// 			},
	// 		},
	// 		dataPath: ['response', 'data'],
	// 	});

	// 	expect(result.current).toMatchInlineSnapshot(`
	// 	Object {
	// 	  "data": undefined,
	// 	  "error": undefined,
	// 	  "fetchMore": [Function],
	// 	  "loading": true,
	// 	  "networkStatus": 1,
	// 	  "refetch": [Function],
	// 	  "variables": undefined,
	// 	}
	// `);

	// 	await waitForNextUpdate();

	// 	expect(result.current).toMatchInlineSnapshot(`
	// 	Object {
	// 	  "data": Array [
	// 	    Object {
	// 	      "username": "wolverine3000",
	// 	    },
	// 	  ],
	// 	  "error": undefined,
	// 	  "fetchMore": [Function],
	// 	  "loading": false,
	// 	  "networkStatus": 7,
	// 	  "refetch": [Function],
	// 	  "variables": Object {
	// 	    "page": 2,
	// 	    "sort": Object {
	// 	      "dob": "asc",
	// 	    },
	// 	    "total": 10,
	// 	  },
	// 	}
	// `);
	// });
});
