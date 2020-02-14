import React from 'react';
import { FFInputText } from '../components/text';
import { FieldProps } from './validation';
import { Form, Field } from 'react-final-form';

export function renderFields(fields: FieldProps[] = []) {
	return fields.map((field, key) => {
		switch (field.type) {
			case 'text': {
				return <FFInputText key={key} {...field} />;
			}
			default: {
				return <input key={key} {...field} />;
			}
		}
	});
}

export { Form, Field };
