import React, { useState, useEffect, useMemo } from 'react';
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
				<label className={styles.inputSmall}>
					<P cfg={{ fontSize: 2, fontWeight: 3, mb: 1 }}>Day</P>
					<Input
						type="text"
						aria-label={`dd-${label}`}
						data-testid={`dd-${testId}`}
						value={day}
						onChange={handleChange(setDay, 32)}
						onBlur={(evt) => {
							if (!evt.target.value || evt.target.value === '0') {
								setMonth('');
								input.onBlur();
							}
						}}
						meta={meta}
						autoComplete="off"
					/>
				</label>
				<label className={styles.inputSmall}>
					<P cfg={{ fontSize: 2, fontWeight: 3, mb: 1 }}>Month</P>
					<Input
						type="text"
						aria-label={`mm-${label}`}
						data-testid={`mm-${testId}`}
						value={month}
						onChange={handleChange(setMonth, 13)}
						onBlur={(evt) => {
							if (!evt.target.value || evt.target.value === '0') {
								setMonth('');
								input.onBlur();
							}
						}}
						meta={meta}
						autoComplete="off"
					/>
				</label>
				<label className={styles.inputLarge}>
					<P cfg={{ fontSize: 2, fontWeight: 3, mb: 1 }}>Year</P>
					<Input
						type="text"
						aria-label={`yyyy-${label}`}
						data-testid={`yyyy-${testId}`}
						onChange={handleChange(setYear, 10000)}
						onBlur={(evt) => {
							if (!evt.target.value || evt.target.value === '0') {
								setMonth('');
								input.onBlur();
							}
						}}
						meta={meta}
						value={year}
						autoComplete="off"
					/>
				</label>
			</Flex>
		</StyledInputLabel>
	);
};

export const FFInputDate: React.FC<FieldProps> = ({ type, ...fieldProps }) => {
	return <Field {...fieldProps} type="text" component={InputDate} />;
};
