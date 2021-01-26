export class SameMonthDateValidator {
	// JS new Date(2020,02,31) evaluates to a valid date in March, this check is to validate that we still
	// have the same values for yyy,mm,dd as passed in after we convert to JS Date
	public ResolvedDateIsInSameMonth(yyyy: string, mm: string, dd: string) {
		let year = parseInt(yyyy);
		let month = parseInt(mm) - 1;
		let day = parseInt(dd);
		let date = new Date(year, month, day);
		if (
			date.getFullYear() == year &&
			date.getMonth() == month &&
			date.getDate() == day
		) {
			return true;
		}
		return false;
	}
}
