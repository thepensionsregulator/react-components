import React, { ChangeEvent, useState } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { Input } from '../input/input';
import { parseToDecimals, fixToDecimals, formatThousands } from '../helpers';
import styles from './currency.module.scss';

interface InputCurrencyProps extends FieldRenderProps<number>, FieldExtraProps {
	after?: string;
	before?: string;
	callback?: (e: any) => void;
	decimalPlaces?: number;
	noLeftBorder?: boolean;
	optionalText?: boolean;
	autoformat?: boolean;
}

const InputCurrency: React.FC<InputCurrencyProps> = ({
	label,
	hint,
	input,
	testId,
	meta,
	required,
	placeholder,
	inputWidth: width,
	cfg,
	after,
	before,
	callback,
	decimalPlaces,
	noLeftBorder,
	optionalText,
	autoformat,
	...props
}) => {
	const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
	const validKeys = [
		'Backspace',
		'Enter',
		'Delete',
		'ArrowUp',
		'ArrowDown',
		'ArrowLeft',
		'ArrowRight',
	];
	const [inputValue, setInputValue] = useState('');

	const formatWithCommas = (value: string) => {
		// if number is integer
		const a = formatThousands(value.replaceAll(',', ''), decimalPlaces);

		// if number has decimals

		setInputValue(a);

		return a;
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		//const reg = /\d/;
		if (
			(!digits.includes(e.key) && !validKeys.includes(e.key)) ||
			inputValue.length > String(props.max).length + decimalPlaces
		)
			e.preventDefault();
		else console.log('valid key');
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		decimalPlaces
			? autoformat // input type: 'text'
				? input.onChange(e.target.value && formatWithCommas(e.target.value))
				: input.onChange(
						e.target.value && parseToDecimals(e.target.value, decimalPlaces),
				  )
			: input.onChange(e.target.value && parseInt(e.target.value, 10));
		callback && callback(e);
	};

	const handleBlur = (e: any) => {
		input.onBlur(e); // without this call, validate won't be executed even if specified

		if (autoformat) {
			return true;
		} else {
			const newVal = fixToDecimals(e.target.value, decimalPlaces);
			const a = formatThousands(newVal, decimalPlaces);
			setInputValue(a);
			e.target.value = newVal;
		}
		//				e.target.value = e.target.value ? handleBlur(e.target.value) : null;
	};

	return (
		<StyledInputLabel
			isError={meta && meta.touched && meta.error}
			cfg={Object.assign({ flexDirection: 'column', mt: 1 }, cfg)}
			noLeftBorder={noLeftBorder}
		>
			<InputElementHeading
				label={label}
				required={optionalText !== undefined ? !optionalText : required}
				hint={hint}
				meta={meta}
			/>
			<div className={styles.inputWrapper}>
				<Input
					type={autoformat ? 'text' : 'number'}
					width={width}
					testId={testId}
					label={label}
					touched={meta && meta.touched && meta.error}
					placeholder={placeholder}
					decimalPlaces={decimalPlaces}
					{...input}
					onKeyDown={handleKeyDown}
					onChange={handleOnChange}
					onBlur={handleBlur}
					after={after}
					before={before}
					{...props}
				/>
				{autoformat ? (
					Number(inputValue) > Number(input.max) ? (
						<span>Value not valid</span>
					) : (
						<span>{inputValue}</span>
					)
				) : null}
			</div>
		</StyledInputLabel>
	);
};

export const FFInputCurrency: React.FC<FieldProps> = (fieldProps) => {
	return <Field {...fieldProps} component={InputCurrency} />;
};
