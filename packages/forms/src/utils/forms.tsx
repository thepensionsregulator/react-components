import React from 'react';
import { FieldProps } from './validation';
import { Form, Field, useFormState, useForm } from 'react-final-form';
import { FFInputText } from '../components/text';
import { FFCheckbox } from '../components/checkbox';
import { FFRadioButton } from '../components/radio';
import { FFInputDate } from '../components/date';
import { FFSelect } from '../components/select';
import { FFInputNumber } from '../components/number';

export function renderFields(fields: FieldProps[] = []) {
	return fields.map((field, key) => {
		switch (field.type) {
			case 'checkbox': {
				return <FFCheckbox key={key} {...field} />;
			}
			case 'radio': {
				return <FFRadioButton key={key} {...field} />;
			}
			case 'text': {
				return <FFInputText key={key} {...field} />;
			}
			case 'number': {
				return <FFInputNumber key={key} {...field} />;
			}
			case 'email': {
				return <FFInputText key={key} {...field} />;
			}
			case 'password': {
				return <FFInputText key={key} {...field} />;
			}
			case 'date': {
				return <FFInputDate key={key} {...field} />;
			}
			case 'select': {
				return <FFSelect key={key} {...field} />;
			}
			default: {
				console.error(`Incorrect field type: ${field.type}`);
				return null;
			}
		}
	});
}

export { Form, Field, useFormState, useForm };
