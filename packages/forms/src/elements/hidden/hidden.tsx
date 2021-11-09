import React, { useEffect } from 'react';
import { FieldInputTypes } from '../../renderFields';
import accessibilityStyles from '@tpr/theming/lib/accessibility.module.scss';

export type HiddenInputProps = {
	type: FieldInputTypes;
	disabled?: boolean;
	updatedValue?: string;
	[key: string]: any;
};
export const HiddenInput: React.FC<HiddenInputProps> = ({
	type,
	disabled = false,
	required = false,
	input,
	meta,
	updatedValue,
	...rest
}) => {
	useEffect(() => {
		if (typeof updatedValue !== 'undefined') {
			input.onChange(updatedValue);
		}
	}, [updatedValue]);

	return (
		<input
			type={type}
			disabled={disabled}
			required={required}
			className={accessibilityStyles.visuallyHidden}
			{...rest}
		/>
	);
};
