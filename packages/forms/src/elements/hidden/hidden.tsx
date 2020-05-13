import React from 'react';
import { FieldInputTypes } from '../../renderFields';
import styles from './hidden.module.scss';

export type HiddenInputProps = {
	type: FieldInputTypes;
	disabled?: boolean;
	[key: string]: any;
};
export const HiddenInput: React.FC<HiddenInputProps> = ({
	type,
	disabled = false,
	...rest
}) => {
	return (
		<input
			type={type}
			disabled={disabled}
			className={styles.hiddenInput}
			{...rest}
		/>
	);
};
