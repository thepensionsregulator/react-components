export const postcodeValidator = (
	postcode: string,
	invalidPostcodeMessage: string,
) => {
	if (
		!postcode ||
		!/^[A-Z]{1,2}[0-9]{1,2}[A-Z]? ?[0-9][ABDEFGHJLNPQRSTUWXYZ]{2}$/i.test(
			postcode,
		)
	) {
		return invalidPostcodeMessage;
	}
};
