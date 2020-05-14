import React from 'react';
import { FFInputText } from './elements/text/text';
import { FFInputNumber } from './elements/number/number';
import { FlexProps, SpaceProps, LayoutProps } from '@tpr/core';
import { FieldProps as FinalFormFieldProps } from 'react-final-form';
import { FFRadioButton } from 'elements/radio/radio';

// export * from 'react-final-form';

export type FieldInputTypes =
	| 'text'
	| 'checkbox'
	| 'radio'
	| 'number'
	| 'email'
	| 'password'
	| 'date'
	| 'select';

export type FieldOptions = {
	label: string;
	value: any;
};

export type FieldExtraProps = Partial<{
	/** If defined, adds an input label above the input */
	label: string;
	/** field hints or requirements explained */
	hint: string;
	/** For radio buttons */
	checked: boolean;
	/** argument for tests */
	testId: string;
	options: FieldOptions[];
	/** Sets max input width without affecting labels */
	inputWidth: LayoutProps['width'];
	/** flex and space props */
	cfg: FlexProps & SpaceProps;
}>;

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
			// case 'checkbox': {
			//   return <FFCheckbox key={key} {...field} />;
			// }
			case 'radio': {
				return <FFRadioButton key={key} {...field} />;
			}
			case 'email': {
				return <FFInputText key={key} {...field} />;
			}
			case 'password': {
				return <FFInputText key={key} {...field} />;
			}
			// case 'date': {
			//   return <FFInputDate key={key} {...field} />;
			// }
			// case 'select': {
			//   return <FFSelect key={key} {...field} />;
			// }
			default: {
				console.error(`Incorrect field type: ${field.type}`);
				return null;
			}
		}
	});
}
