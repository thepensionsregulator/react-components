import { validate } from '../../validation';

export function finalFormValidationMock(fields) {
	const validation = validate(fields);
	const pairs = fields.reduce(
		(acc, item) => ({
			...acc,
			[item.name]: item.value,
		}),
		{},
	);

	return validation(pairs);
}
