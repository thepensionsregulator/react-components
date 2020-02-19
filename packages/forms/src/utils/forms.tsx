import React from 'react';
import { FieldProps } from './validation';
import { Form, Field } from 'react-final-form';
import { FFInputText } from '../components/text';
import { FFCheckbox } from '../components/checkbox';
import { FFRadioButton } from '../components/radio';

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
			case 'email': {
				return <FFInputText key={key} {...field} />;
			}
			case 'password': {
				return <FFInputText key={key} {...field} />;
			}
			default: {
				console.error(`Incorrect field type: ${field.type}`);
				return null;
			}
		}
	});
}

export { Form, Field };
