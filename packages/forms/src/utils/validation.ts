import qs from 'qs';
import { FieldState } from 'final-form';

const getObjectValueByString = (obj: object, path: string): unknown => {
	return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

// export type FieldInputTypes =
// 	| 'checkbox'
// 	| 'color'
// 	| 'date'
// 	| 'email'
// 	| 'file'
// 	| 'number'
// 	| 'password'
// 	| 'radio'
// 	| 'range'
// 	| 'search'
// 	| 'text'
// 	| 'url';

export type FieldOptions = {
	label: string;
	value: any;
};

export type FieldProps = {
	/** Field name, required for future ref. */
	name: string;
	/** HTML input type */
	type?: string;
	/** If defined, adds an input label above the input */
	label?: string;
	/** If defined, sets a default value on an input on initial load */
	value?: any;
	/** Error description as a string */
	error?: string;
	/** If required and has title, will display * next to the title */
	required?: boolean;
	/** field hints or requirements explained */
	hint?: string;
	/** For radio buttons */
	checked?: boolean;
	/** Accepts a validation function for custom validation */
	validate?: (value: any, allValues: object, meta?: FieldState<any>) => any;
	meta?: any;
	/** argument for tests */
	testId?: string;
	input?: any;
	options?: FieldOptions[];
	/** Select Component feature. If value is an object then you
	 * can transform final returned value from the selection */
	onChange?: (value: FieldOptions, set: Function) => void;
};

export function validate(formFields: FieldProps[]) {
	/** Save fields with errors in memory to avoid filtering on every key stroke */
	const fieldsWithErrors = formFields.filter(
		field => !field.validate && field.error,
	);
	return <T extends object>(keyValuePairs: T): { [key: string]: any } => {
		const errors = {};

		fieldsWithErrors.map(({ name, error }) => {
			// get field value if object is nested
			const fieldValue = getObjectValueByString(keyValuePairs, name);
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
