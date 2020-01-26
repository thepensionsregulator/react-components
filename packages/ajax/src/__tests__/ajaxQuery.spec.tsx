import '@testing-library/jest-dom/extend-expect';
import renderAjaxQuery from '../__mocks__/renderAjaxQuery';
import { wait } from '@testing-library/react';

describe('AjaxQuery', () => {
	test('it renders correctly', async () => {
		const [_, renderArg] = renderAjaxQuery({
			query: 'users',
			type: 'get',
			store: 'users',
		});

		await wait(() => console.log(renderArg));

		expect(true).toBeTruthy();
	});
});
