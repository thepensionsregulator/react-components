import {
	capitalize,
	capitalizeEachWord,
	removeExtraWhiteSpaces,
} from '../StringHelpers';

describe('deleteExtraWhiteSpaces', () => {
	const firstString: string = ' The Pensions Regulator  ';
	const secondString: string = 'The   Pensions   Regulator';
	const thirdString: string = '   The   Pensions  Regulator ';

	const expectedResult: string = 'The Pensions Regulator';

	test('deleteExtraWhiteSpaces works as expected', () => {
		expect(removeExtraWhiteSpaces(firstString)).toEqual(expectedResult);
		expect(removeExtraWhiteSpaces(secondString)).toEqual(expectedResult);
		expect(removeExtraWhiteSpaces(thirdString)).toEqual(expectedResult);
	});
});

describe('Capitalize', () => {
	const firstString: string = 'The Pensions Regulator  ';
	const secondString: string = 'the  pensions regulator';
	const thirdString: string = ' THE PENSIONS REGULATOR';

	const expectedResult: string = 'The pensions regulator';

	test('capitalize works as expected', () => {
		expect(capitalize(firstString)).toEqual(expectedResult);
		expect(capitalize(secondString)).toEqual(expectedResult);
		expect(capitalize(thirdString)).toEqual(expectedResult);
	});
});

describe('capitalizeEachWord', () => {
	const firstString: string = 'the  pensions regulator';
	const secondString: string = ' THE PENSIONS REGULATOR';
	const thirdString: string = '45/50 MAIN ROAD  ';
	const fourthString: string = '45 FIRST FLOOR, MAIN ROAD';

	test('capitalizeEachWord works as expected', () => {
		expect(capitalizeEachWord(firstString)).toEqual('The Pensions Regulator');
		expect(capitalizeEachWord(secondString)).toEqual('The Pensions Regulator');
		expect(capitalizeEachWord(thirdString)).toEqual('45/50 Main Road');
		expect(capitalizeEachWord(fourthString)).toEqual(
			'45 First Floor, Main Road',
		);
	});
});
