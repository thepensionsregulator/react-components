import React from 'react';
import { FFInputText } from '../elements';
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
