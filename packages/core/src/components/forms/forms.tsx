import React from 'react';
import { FFText } from './types';

export function renderFields(fields = []) {
	return fields.map((field, key) => {
		switch (field.type) {
			case 'text': {
				return <FFText key={key} {...field} />;
			}
			default: {
				return <input key={key} {...field} />;
			}
		}
	});
}
