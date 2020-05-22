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
