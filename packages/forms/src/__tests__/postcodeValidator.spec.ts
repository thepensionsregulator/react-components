import PostcodeValidator from '../elements/address/postcodeValidator';

const invalidPostcodeMessage = 'Enter a valid postcode';

describe('The PostcodeValidator', () => {
	let validator: PostcodeValidator;
	beforeAll(() => (validator = new PostcodeValidator(invalidPostcodeMessage)));

	const validPostcodes = [
		'M2 5AA',
		'M25AA',
		'M33 5AA',
		'M335AA',
		'BN1 1AA',
		'BN11AA',
		'DN16 1AA',
		'DN161AA',
		'W1A 1AA',
		'W1A1AA',
		'ec1a 1aa',
		'ec1a1aa',
	];

	// The incode (second part) cannot contain the letters C, I, K, M, O & V
	// and partial postcodes are not valid
	const invalidPostcodes = [
		'M2 5CA',
		'M2 5IA',
		'M2 5KA',
		'M2 5AM',
		'M2 5AO',
		'M2 5AV',
		'BN7',
		'BN7 4D',
	];

	test.each(validPostcodes)('should allow %p', (postcode) => {
		const result = validator.validatePostcode(postcode);
		expect(result).toBeUndefined();
	});

	test.each(invalidPostcodes)('should not allow %p', (postcode) => {
		const result = validator.validatePostcode(postcode);
		expect(result).toEqual(invalidPostcodeMessage);
	});
});
