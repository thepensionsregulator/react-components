export const formatPostcode = (postcode: string): string => {
	return postcode
		? postcode
				.toUpperCase()
				.replace(
					/^([A-Z]{1,2}[0-9]{1,2}[A-Z]?) ?([0-9][ABDEFGHJLNPQRSTUWXYZ]{2})$/,
					'$1 $2',
				)
		: postcode;
};
