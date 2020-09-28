export const extractToObject = (
	address: object[] = [],
): { [key: string]: string } => {
	return address.reduce((acc: any, val: any) => {
		const [key] = Object.keys(val);
		if (key) {
			return {
				...acc,
				[key]: val[key],
			};
		} else {
			return acc;
		}
	}, {});
};

export const postcodeIsValid = (
	postcodeToValidate: string,
	postcodeRegExPattern: any,
) => {
	if (!postcodeToValidate) return false;

	const cleanedPostcode = postcodeToValidate.replace(/[\s()-.]/g, '');
	return (
		cleanedPostcode != null &&
		RegExp(postcodeRegExPattern, 'i').test(cleanedPostcode)
	);
};
