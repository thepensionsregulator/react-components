import React from 'react';
import { FFInputText } from './elements/text/text';
import { FFInputNumber } from './elements/number/number';
import { FFCheckbox } from './elements/checkbox/checkbox';
import { FFRadioButton } from './elements/radio/radio';
import { FFInputDate } from './elements/date/date';
import { FFSelect } from './elements/select/select';
import { FFInputEmail } from './elements/email/email';
import { FFInputPhone } from './elements/phone/phone';
import { FlexProps, SpaceProps } from '@tpr/core';
import { FieldProps as FinalFormFieldProps } from 'react-final-form';

export type FieldInputTypes =
	| 'text'
	| 'checkbox'
	| 'radio'
	| 'number'
	| 'password'
	| 'date'
	| 'select'
	| 'phone'
	| 'email'
	| 'hidden'
	| 'url';

export type FieldOptions = {
	label: string;
	value: any;
};

export type FieldExtraProps = {
	/** an id that identifies the input on the page **/
	id?: string;
	/** input label above the input box */
	label?: string;
	/** aria-label for accessibility when label is not specified */
	ariaLabel?: string;
	/** field hints or requirements explained */
	hint?: string;
	/** for radio buttons */
	checked?: boolean;
	readOnly?: boolean;
	required?: boolean;
	autoComplete?: string;
	/** argument for tests */
	testId?: string;
	/** options for Select input field */
	options?: FieldOptions[];
	/** flex and space props */
	cfg?: FlexProps & SpaceProps;
};

export interface FieldProps
	extends FinalFormFieldProps<any, any>,
		FieldExtraProps {
	type?: FieldInputTypes;
}

export function renderFields(fields: FieldProps[] = []) {
	return fields.map((field, key) => {
		switch (field.type) {
			case 'text': {
				return <FFInputText key={key} {...field} />;
			}
			case 'number': {
				return <FFInputNumber key={key} {...field} />;
			}
			case 'checkbox': {
				return <FFCheckbox key={key} {...field} />;
			}
			case 'radio': {
				return <FFRadioButton key={key} {...field} />;
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
			case 'phone': {
				return <FFInputPhone key={key} {...field} />;
			}
			case 'email': {
				return <FFInputEmail key={key} {...field} />;
			}
			default: {
				console.error(`Incorrect field type: ${field.type}`);
				return null;
			}
		}
	});
}
