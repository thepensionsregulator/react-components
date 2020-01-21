import { getObjectValueByString } from '../index';

describe('utils', () => {
	test('getObjectValueByString direct', () => {
		const value = getObjectValueByString({ firstName: 'something in it' }, 'firstName');
		expect(value).toEqual('something in it');
	});

	test('getObjectValueByString nested', () => {
		const value = getObjectValueByString(
			{ address: { line: { firstName: 'something in it' } } },
			'address.line.firstName',
		);
		expect(value).toEqual('something in it');
	});
});
