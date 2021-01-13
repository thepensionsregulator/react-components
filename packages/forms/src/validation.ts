import qs from 'qs';
import { merge } from 'lodash';
import { FieldProps } from './renderFields';

const getObjectValueByString = (
	obj: { [key: string]: any },
	path: string,
): unknown => {
	return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export function validate(formFields: FieldProps[]) {
	/** Save fields with errors in memory to avoid filtering on every key stroke */
	const fieldsWithErrors = formFields.filter(
		(field) => !field.validate && field.error,
	);
	return (keyValuePairs: object): { [key: string]: any } => {
		const errors = {};

		for (const { name, error } of fieldsWithErrors) {
			// get field value if object is nested
			const fieldValue = getObjectValueByString(keyValuePairs, name);
			// if error is a function, make it a callback function and process the value
			if (typeof error === 'function') {
				const errorMessage = error(fieldValue, keyValuePairs);
				const errorObject = qs.parse(`${name}=${errorMessage}`, {
					allowDots: true,
				});
				if (errorMessage) return merge(errors, errorObject);
			}
			// typof error is a string and there is no field value, assign error to errors
			if (typeof error === 'string' &&
				(!fieldValue ||
				(typeof fieldValue === 'string' && !fieldValue.trim()) ||
				(Array.isArray(fieldValue) && !fieldValue.length))
			) {
				// construct object from string with errors
				const errorObject = qs.parse(`${name}=${error}`, {
					allowDots: true,
				});

				merge(errors, errorObject);
			}
		}

		return errors;
	};
}
