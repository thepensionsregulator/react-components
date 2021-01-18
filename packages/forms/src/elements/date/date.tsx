import React, { ChangeEvent, useEffect, memo, useReducer } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { isValid, toDate, format } from 'date-fns';
import { P, Flex } from '@tpr/core';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { Input } from '../input/input';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import isEqual from 'lodash.isequal';
import styles from './date.module.scss';

const handleChange = (onChange: Function, value: number) => ({
	target,
}: ChangeEvent<HTMLInputElement>) => {
	const newValue = target.value.replace(/[^0-9]/g, '').trim();
	if (!newValue) return onChange('');
	if (parseInt(newValue, 10) < value) {
		return onChange(newValue);
	}
};

function datePassesFebruaryCheck(yyyy: string, mm: string, dd: string){
	let year =parseInt(yyyy);
	let month =parseInt(mm);
	let day= parseInt(dd);
	let date = new Date(year, month,day);
	if (date.getFullYear() == year && date.getMonth() == month && date.getDate() == day) {
		return true;
	}
	return false;
}
function getValidDate(yyyy: string, mm: string, dd: string) {

	const date = toDate(new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd)));

	if (isValid(date) && yyyy.length === 4 && datePassesFebruaryCheck(yyyy,mm,dd)) {
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
	disabled?: boolean;
	readOnly?: boolean;
	hideMonth?: boolean;
	maxLength?: number;
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
	disabled,
	readOnly,
	hideMonth,
	maxLength,
}) => {
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
				disabled={disabled}
				aria-label={ariaLabel}
				data-testid={testId}
				value={value}
				readOnly={readOnly}
				onFocus={({ target }: ChangeEvent<HTMLInputElement>) => target.select()}
				onChange={handleChange(updateFn, maxInt)}
				onBlur={(evt: ChangeEvent<HTMLInputElement>) => {
					if (!evt.target.value || evt.target.value === '0') {
						!hideMonth && setMonth('');
						onBlur();
					}
				}}
				meta={meta}
				autoComplete="off"
				maxLength={maxLength}
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

		return (
			<StyledInputLabel
				isError={meta && meta.touched && meta.error}
				element="div"
				onFocus={input.onFocus}
				onBlur={input.onBlur}
				data-testid={`date-input-${testId}`}
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
				<Flex>
					{!hideDay && (
						<DateInputField
							label="Day"
							ariaLabel={`${label}: Day`}
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
							label="Month"
							ariaLabel={`${label}: Month`}
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
						label="Year"
						small={false}
						ariaLabel={`${label}: Year`}
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
