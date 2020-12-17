class PostcodeValidator {
	constructor(private invalidPostcodeMessage: string) {}

	public validatePostcode(postcode: string) {
		if (
			!postcode ||
			!/^[A-Z]{1,2}[0-9]{1,2}[A-Z]? ?[0-9][ABDEFGHJLNPQRSTUWXYZ]{2}$/i.test(
				postcode,
			)
		) {
			return this.invalidPostcodeMessage;
		}
	}
}

export default PostcodeValidator;
