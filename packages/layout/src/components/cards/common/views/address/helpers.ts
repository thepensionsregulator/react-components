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

export function validPostcode(postcode: string) {
	const PC = postcode.replace(/\s/g, '');
	const regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
	return regex.test(PC);
}
