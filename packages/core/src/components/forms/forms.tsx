import React from 'react';
import { FFInputText } from '../formElements';
import { FieldProps } from './validation';

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
