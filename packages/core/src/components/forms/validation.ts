import qs from 'qs';
import { getObjectValueByString } from 'utils';

// TODO: define available field props
type FieldProps = {
	name: string;
	label?: string;
	value?: any;
	error?: string;
};

export function validate(formFields: FieldProps[]) {
	const fieldsWithErrors = formFields.filter(field => field.error);
	return values => {
		const errors = {};

		fieldsWithErrors.map(({ name, error }) => {
			// get field value if object is nested
			const fieldValue = getObjectValueByString(values, name);
			// construct object from string with errors
			const errorObject = qs.parse(`${name}=${error}`, { allowDots: true });
			// if no field value, assign error to errors
			if (
				!fieldValue ||
				(typeof fieldValue === 'string' && !fieldValue.trim()) ||
				(Array.isArray(fieldValue) && !fieldValue.length)
			) {
				Object.assign(errors, errorObject);
			}
			return null;
		});

		return errors;
	};
}
