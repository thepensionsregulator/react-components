import React, { useEffect } from 'react';
import { FieldInputTypes } from '../../renderFields';
import styles from './hidden.module.scss';

export type HiddenInputProps = {
	type: FieldInputTypes;
	disabled?: boolean;
	updatedValue?: string;
	[key: string]: any;
};
export const HiddenInput: React.FC<HiddenInputProps> = ({
	type,
	disabled = false,
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
			className={styles.hiddenInput}
			{...rest}
		/>
	);
};
