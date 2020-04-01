import React, { useState, useEffect, useMemo } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { isValid, toDate } from 'date-fns';
import {
	StyledInputDiv,
	StyledLabel,
	InputElementHeading,
	Span,
	Flex,
} from '../elements';
import { StyledInput } from '../text/styles';
import { FieldProps } from '../../utils/validation';

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
		return date;
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

export const InputDate: React.FC<FieldRenderProps<string> & FieldProps> = ({
	label,
	hint,
	required,
	input = {},
	meta,
}) => {
	const initialDate = useMemo(() => meta.initial, [meta.initial]);
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
		<StyledInputDiv
			isError={meta && meta.touched && meta.error}
			flexDirection="column"
			onFocus={input.onFocus}
			onBlur={input.onBlur}
		>
			<InputElementHeading
				label={label}
				required={required}
				hint={hint}
				meta={meta}
			/>
			<Flex>
				<StyledLabel flex="0 0 auto" flexDirection="column" width="48px" mr={0}>
					<Span>Day</Span>
					<StyledInput
						type="text"
						aria-label={`dd-${label}`}
						value={day}
						onChange={handleChange(setDay, 32)}
						onBlur={evt => {
							if (!evt.target.value || evt.target.value === '0') {
								setMonth('');
								input.onBlur();
							}
						}}
						meta={meta}
						autoComplete="off"
					/>
				</StyledLabel>
				<StyledLabel flex="0 0 auto" flexDirection="column" width="48px" mr={0}>
					<Span>Month</Span>
					<StyledInput
						type="text"
						aria-label={`mm-${label}`}
						value={month}
						onChange={handleChange(setMonth, 13)}
						onBlur={evt => {
							if (!evt.target.value || evt.target.value === '0') {
								setMonth('');
								input.onBlur();
							}
						}}
						meta={meta}
						autoComplete="off"
					/>
				</StyledLabel>
				<StyledLabel flex="0 0 auto" flexDirection="column" width="70px">
					<Span>Year</Span>
					<StyledInput
						type="text"
						aria-label={`yyyy-${label}`}
						onChange={handleChange(setYear, 10000)}
						onBlur={evt => {
							if (!evt.target.value || evt.target.value === '0') {
								setMonth('');
								input.onBlur();
							}
						}}
						meta={meta}
						value={year}
						autoComplete="off"
					/>
				</StyledLabel>
			</Flex>
		</StyledInputDiv>
	);
};

export const FFInputDate: React.FC<FieldProps> = ({ type, ...fieldProps }) => {
	return <Field {...fieldProps} component={InputDate} />;
};
