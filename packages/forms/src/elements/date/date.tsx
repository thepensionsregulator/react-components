import React, { ChangeEvent, useEffect, memo, useReducer, useState } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { isValid, toDate, format } from 'date-fns';
import { P, Flex } from '@tpr/core';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { Input } from '../input/input';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import isEqual from 'lodash.isequal';
import styles from './date.module.scss';
import { SameMonthDateValidator } from './services/SameMonthDateValidator';
import AccessibilityHelper from '../accessibilityHelper';

const handleChange = (onChange: Function, value: number) => ({
	target,
}: ChangeEvent<HTMLInputElement>) => {
	const newValue = target.value.replace(/[^0-9]/g, '').trim();
	if (!newValue) return onChange('');
	if (parseInt(newValue, 10) < value) {
		return onChange(newValue);
	}
};

const sameMonthValidator = new SameMonthDateValidator();
function getValidDate(yyyy: string, mm: string, dd: string) {
	const date = toDate(new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd)));

	if (
		isValid(date) &&
		yyyy.length === 4 &&
		sameMonthValidator.ResolvedDateIsInSameMonth(yyyy, mm, dd)
	) {
		return format(date, 'yyyy-MM-dd');
	}
	return undefined;
}

const transformDate = (initialDate: any) => {
	if (!initialDate) return { dd: '', mm: '', yyyy: '' };
	const valid = initialDate ? isValid(initialDate) : false;
	return {
		dd: valid ? `${initialDate.getDate()}` : '',
		mm: valid ? `${initialDate.getMonth() + 1}` : '',
		yyyy: valid ? `${initialDate.getFullYear()}` : '',
	};
};

type DateInputFieldProps = {
	id?: string;
	parentId?: string;
	small?: boolean;
	testId?: string;
	value: any;
	updateFn: Function;
	setMonth: Function;
	onBlur: Function;
	maxInt: number;
	meta: any;
	label: string;
	disabled?: boolean;
	readOnly?: boolean;
	hideMonth?: boolean;
	maxLength?: number;
};
const DateInputField: React.FC<DateInputFieldProps> = ({
	id,
	parentId,
	small = true,
	label,
	testId,
	value,
	updateFn,
	maxInt,
	setMonth,
	onBlur,
	meta,
	disabled,
	readOnly,
	hideMonth,
	maxLength,
}) => {

	const [hasFocus, setHasFocus] = useState(false);
	const helper = new AccessibilityHelper(parentId, false, false)
	return (
		<label className={small ? styles.inputSmall : styles.inputLarge}>
			<P
				cfg={{
					fontSize: 2,
					fontWeight: 4,
					mb: 1,
					lineHeight: 3,
					color: 'neutral.8',
				}}
			>
				{label}
			</P>
			<Input
				type="string"
				id={id}
				disabled={disabled}
				data-testid={testId}
				value={value}
				readOnly={readOnly}
				onFocus={({ target }: ChangeEvent<HTMLInputElement>) => {
					target.select();
					setHasFocus(true);
				}}
				onChange={handleChange(updateFn, maxInt)}
				onBlur={(evt: ChangeEvent<HTMLInputElement>) => {
					if (!evt.target.value || evt.target.value === '0') {
						!hideMonth && setMonth('');
						setHasFocus(false);
						onBlur();
					}
				}}
				meta={meta}
				autoComplete="off"
				maxLength={maxLength}
				isError={meta && meta.touched && meta.error}
				accessibilityHelper={!hasFocus ? helper: null}
			/>
		</label>
	);
};

type InputDateProps = FieldRenderProps<string> & FieldExtraProps;
interface InputDateComponentProps extends InputDateProps {
	hideDay?: boolean;
	hideMonth?: boolean;
}
export const InputDate: React.FC<InputDateComponentProps> = memo(
	({
		id,
		label,
		hint,
		required,
		input,
		meta,
		testId = 'field',
		cfg,
		disabled,
		readOnly,
		hideDay,
		hideMonth,
	}) => {
		// react-final-form types says it's a string, incorrect, it's a date object.
		const { dd, mm, yyyy } = transformDate(meta.initial);
		const [{ dd: day, mm: month, yyyy: year }, setState] = useReducer(
			(p: any, n: any) => ({ ...p, ...n }),
			{ dd, mm, yyyy },
		);

		useEffect(() => {
			setState({ dd: hideDay ? 1 : dd, mm: hideMonth ? 1 : mm, yyyy: yyyy });
		}, [dd, mm, yyyy]);

		useEffect(() => {
			if (input && typeof input.onChange === 'function') {
				const newDate = getValidDate(year, month, day);
				if (newDate) {
					input.onChange(newDate);
				} else {
					input.onChange(undefined);
				}
			}
		}, [day, month, year, input]);

		const isError: boolean = meta && meta.touched && meta.error;
		const helper = new AccessibilityHelper(id, !!label, !!hint);

		return (
			<StyledInputLabel
				isError={meta && meta.touched && meta.error}
				aria-labelled-by={helper.labelId}
				element="fieldset"
				onFocus={input.onFocus}
				onBlur={input.onBlur}
				data-testid={`date-input-${testId}`}
				aria-describedby={helper.formatAriaDescribedBy(isError)}
				cfg={Object.assign(
					{ mt: 1, py: 1, alignItems: 'flex-start', flexDirection: 'column' },
					cfg,
				)}
			>
				<InputElementHeading
					element="legend"
					label={label}
					required={required}
					hint={hint}
					meta={meta}
					accessibilityHelper={helper}
				/>
				<Flex>
					{!hideDay && (
						<DateInputField
							parentId={id}
							label="Day"
							testId={`dd-${testId}`}
							value={day}
							updateFn={(dd: number) => setState({ dd })}
							maxInt={32}
							setMonth={(mm: number) => setState({ mm })}
							onBlur={input.onBlur}
							meta={meta}
							disabled={disabled}
							readOnly={readOnly}
							maxLength={2}
						/>
					)}
					{!hideMonth && (
						<DateInputField
							parentId={id}
							label="Month"
							testId={`mm-${testId}`}
							value={month}
							updateFn={(mm: number) => setState({ mm })}
							maxInt={13}
							setMonth={(mm: number) => setState({ mm })}
							onBlur={input.onBlur}
							meta={meta}
							disabled={disabled}
							readOnly={readOnly}
							maxLength={2}
						/>
					)}
					<DateInputField
						parentId={id}
						label="Year"
						small={false}
						testId={`yyyy-${testId}`}
						value={year}
						updateFn={(yyyy: number) => setState({ yyyy })}
						maxInt={10000}
						setMonth={(mm: number) => setState({ mm })}
						onBlur={input.onBlur}
						meta={meta}
						disabled={disabled}
						readOnly={readOnly}
						hideMonth={hideMonth}
						maxLength={4}
					/>
				</Flex>
			</StyledInputLabel>
		);
	},
	({ meta: prevMeta }, { meta: nextMeta }) => isEqual(prevMeta, nextMeta),
);

export const FFInputDate: React.FC<FieldProps> = ({ type, ...fieldProps }) => {
	return <Field {...fieldProps} type="text" component={InputDate} />;
};
