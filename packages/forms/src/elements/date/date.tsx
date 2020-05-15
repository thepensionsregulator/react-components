import React, { ChangeEvent, useState, useEffect, useMemo } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { isValid, toDate, format } from 'date-fns';
import { P, Flex } from '@tpr/core';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { Input } from '../input/input';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import styles from './date.module.scss';

const handleChange = (onChange: Function, value: number) => ({ target }) => {
	if (!target.value) {
		return onChange('');
	}
	if (parseInt(target.value, 10) < value) {
		return onChange(target.value.trim().replace(/[^\d]/));
	}
};

function getValidDate(yyyy: string, mm: string, dd: string) {
	const date = toDate(new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd)));
	if (isValid(date) && yyyy.length === 4) {
		return format(date, 'yyyy-MM-dd');
	}
	return undefined;
}

const useDateTransformer = (initialDate: Date = undefined) => {
	return useMemo(() => {
		const valid = initialDate ? isValid(initialDate) : false;
		return {
			dd: valid ? `${initialDate.getDate()}` : undefined,
			mm: valid ? `${initialDate.getMonth() + 1}` : undefined,
			yyyy: valid ? `${initialDate.getFullYear()}` : undefined,
		};
	}, [initialDate]);
};

type DateInputFieldProps = {
	small?: boolean;
	ariaLabel?: string;
	testId?: string;
	value: any;
	updateFn: Function;
	setMonth: Function;
	onBlur: Function;
	maxInt: number;
	meta: any;
	label: string;
};
const DateInputField: React.FC<DateInputFieldProps> = ({
	small = true,
	label,
	ariaLabel,
	testId,
	value,
	updateFn,
	maxInt,
	setMonth,
	onBlur,
	meta,
}) => {
	return (
		<label className={small ? styles.inputSmall : styles.inputLarge}>
			<P cfg={{ fontSize: 2, fontWeight: 3, mb: 1 }}>{label}</P>
			<Input
				type="text"
				aria-label={ariaLabel}
				data-testid={testId}
				value={value}
				onFocus={({ target }: ChangeEvent<HTMLInputElement>) => target.select()}
				onChange={handleChange(updateFn, maxInt)}
				onBlur={(evt: ChangeEvent<HTMLInputElement>) => {
					if (!evt.target.value || evt.target.value === '0') {
						setMonth('');
						onBlur();
					}
				}}
				meta={meta}
				autoComplete="off"
			/>
		</label>
	);
};

type InputDateProps = FieldRenderProps<string> & FieldExtraProps;
export const InputDate: React.FC<InputDateProps> = ({
	label,
	hint,
	required,
	input,
	meta,
	testId,
	inputWidth: width,
	cfg,
}) => {
	// react-final-form types says it's a string, incorrect, it's a date object.
	const initialDate: any = useMemo(() => meta.initial, [meta.initial]);
	const { dd, mm, yyyy } = useDateTransformer(initialDate);
	const [day, setDay] = useState(dd);
	const [month, setMonth] = useState(mm);
	const [year, setYear] = useState(yyyy);

	useEffect(() => {
		if (input && typeof input.onChange === 'function') {
			const newDate = getValidDate(year, month, day);
			if (newDate) {
				input.onChange(newDate);
			} else {
				input.onChange(undefined);
			}
		}
	}, [day, month, year, initialDate]);

	return (
		<StyledInputLabel
			isError={meta && meta.touched && meta.error}
			element="div"
			onFocus={input.onFocus}
			onBlur={input.onBlur}
			cfg={Object.assign(
				{ mt: 1, py: 1, alignItems: 'flex-start', flexDirection: 'column' },
				cfg,
			)}
		>
			<InputElementHeading
				label={label}
				required={required}
				hint={hint}
				meta={meta}
			/>
			<Flex cfg={{ width }}>
				<DateInputField
					label="Day"
					ariaLabel={`dd-${label}`}
					testId={`dd-${testId}`}
					value={day}
					updateFn={setDay}
					maxInt={32}
					setMonth={setMonth}
					onBlur={input.onBlur}
					meta={meta}
				/>
				<DateInputField
					label="Month"
					ariaLabel={`mm-${label}`}
					testId={`mm-${testId}`}
					value={month}
					updateFn={setMonth}
					maxInt={13}
					setMonth={setMonth}
					onBlur={input.onBlur}
					meta={meta}
				/>
				<DateInputField
					label="Year"
					small={false}
					ariaLabel={`yyyy-${label}`}
					testId={`yyyy-${testId}`}
					value={year}
					updateFn={setYear}
					maxInt={10000}
					setMonth={setMonth}
					onBlur={input.onBlur}
					meta={meta}
				/>
			</Flex>
		</StyledInputLabel>
	);
};

export const FFInputDate: React.FC<FieldProps> = ({ type, ...fieldProps }) => {
	return <Field {...fieldProps} type="text" component={InputDate} />;
};
