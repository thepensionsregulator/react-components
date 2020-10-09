import React, { ChangeEvent, useState } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { Input } from '../input/input';
import { format, formatWithDecimals, containsDecimals, fixToDecimals } from '../helpers';
import styles from './currency.module.scss';

interface InputCurrencyProps extends FieldRenderProps<number>, FieldExtraProps {
	after?: string;
	before?: string;
	callback?: (e: any) => void;
	decimalPlaces?: number;
	noLeftBorder?: boolean;
	optionalText?: boolean;
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
	decimalPlaces = 2,
	noLeftBorder,
	optionalText,
	...props
}) => {
	const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
	const validKeys = [
		'Backspace',
		'Enter',
		'Delete',
		'ArrowUp',
		'ArrowDown',
		'ArrowLeft',
		'ArrowRight',
	];
	// format: 999,999,999,999.00
	const maxIntLengthWithCommas:number = 15;
	const maxInputValueLength:number = maxIntLengthWithCommas + 1 + decimalPlaces;

	const [inputValue, setInputValue] = useState<string>('');
	const [numValue, setNumValue] = useState<string>('');
	const [decimals, setDecimals] = useState<null | number>(null);
	const [dot, setDot] = useState<boolean>(false);

	const formatWithCommas = (value: string) => {
		const numString = value.replaceAll(',', '');
		// if number is integer
		if(!containsDecimals(value)) {
			console.log("not-contains-decimals")
			setNumValue(numString);
			const numFormatted = format(numString);
			// numFormatted = "12,345,678"
			setInputValue(numFormatted);
			return numFormatted;
		}
		else {   // if number has decimals
			console.log("does-contain-decimals");
			const numDecimalsString = formatWithDecimals(numString, decimalPlaces);
			// numDecimalsString = "123,456.77"
			setInputValue(numDecimalsString);
			setNumValue(numDecimalsString.replaceAll(',', ''));
			return numDecimalsString;
		}
	};

	const handleKeyDown = (e: any) => {
		// typing '.' when already exists one in the value
		if (e.key === '.') {
			//console.log('inside IF e.key == .');
			dot ? e.preventDefault() : setDot(true);
			return true;
		}
		
		// if the input has reached the maximum length
		if (inputValue.length >= maxInputValueLength) {
			// only allow the validKeys
			console.log('inside first IF: inputValue.length >= maxInputValueLength');
			!validKeys.includes(e.key) && e.preventDefault();
		} 
		else {
			console.log('inside first ELSE');
			if (!digits.includes(e.key) && !validKeys.includes(e.key))
				e.preventDefault();
			else console.log('valid key');
		}
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log('handleOnChange');
		if(String(e.target.value)[e.target.value.length-1] == '.'){
			input.onChange(e.target.value);
		}
		else {
			input.onChange(e.target.value && formatWithCommas(e.target.value));
		}
		if(!containsDecimals(e.target.value)) setDot(false);
		console.log('handleOnChange value: ' + e.target.value);
		e.target.value === '' && setNumValue(''); 
		e.target.value === '' && setInputValue('');
		callback && callback(e);
	};

	const handleBlur = (e: any) => {
		console.log('handleBlur');
		console.log('handleBlur value: ' + e.target.value);
		input.onBlur(e); // without this call, validate won't be executed even if specified
		let numFormatted:string = '';
		if(numValue !== '') {
			console.log('numValue != ""' , numValue);
			if(!containsDecimals(numValue)) {
				console.log('numValue not contains decimals');
				numFormatted = fixToDecimals(numValue, decimalPlaces);
			}
			else {
				console.log('numValue contains decimals');
				numFormatted = formatWithCommas(e.target.value);
			}
		}
		console.log('numFormatted: ' + numFormatted);
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
					type="text"
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
				<span>{inputValue}</span>
			</div>
		</StyledInputLabel>
	);
};

export const FFInputCurrency: React.FC<FieldProps> = (fieldProps) => {
	return <Field {...fieldProps} component={InputCurrency} />;
};
