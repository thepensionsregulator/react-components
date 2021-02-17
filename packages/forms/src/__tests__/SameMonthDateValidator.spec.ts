import { SameMonthDateValidator } from '../elements/date/services/SameMonthDateValidator';

let validator = new SameMonthDateValidator();

describe('Date input', () => {
	test('date field is invalid for days 30 and 31 of february ', () => {
		expect(validator.ResolvedDateIsInSameMonth('2020', '02', '30')).toBeFalsy();
		expect(validator.ResolvedDateIsInSameMonth('2020', '02', '31')).toBeFalsy();
	});

	test('date field is valid for day 31 for other months', () => {
		expect(
			validator.ResolvedDateIsInSameMonth('2020', '01', '31'),
		).toBeTruthy();
	});
});
