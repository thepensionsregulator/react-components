import React, {
	ChangeEvent,
	useEffect,
	memo,
	useReducer,
	useState,
} from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { isValid, toDate, format } from 'date-fns';
import { P, Flex } from '@tpr/core';
import isEqual from 'lodash.isequal';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { Input } from '../input/input';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { SameMonthDateValidator } from './services/SameMonthDateValidator';
import AccessibilityHelper from '../accessibilityHelper';
import { HiddenLabelIdGenerator } from './services/HiddenLabelIdGenerator';
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
	disabled?: boolean;
	required?: boolean;
	id?: string;
	label: string;
	maxInt: number;
	maxLength?: number;
	meta: any;
	onFocus?: Function;
	onBlur?: Function;
	parentId?: string;
	readOnly?: boolean;
	small?: boolean;
	testId?: string;
	updateFn: Function;
	value: any;
	name: string;
};

const DateInputField: React.FC<DateInputFieldProps> = ({
	disabled,
	required = false,
	id,
	label,
	maxInt,
	maxLength,
	meta,
	onFocus,
	onBlur,
	parentId,
	readOnly,
	small = true,
	testId,
	updateFn,
	value,
	name,
}) => {
	const [hasFocus, setHasFocus] = useState(false);
	const helper = new AccessibilityHelper(parentId, false, false);
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
				type="number"
				id={id}
				disabled={disabled}
				required={required}
				data-testid={testId}
				value={value}
				readOnly={readOnly}
				onFocus={({ target }: React.FocusEvent<HTMLInputElement>) => {
					target.select();
					setHasFocus(true);
					onFocus && onFocus();
				}}
				onChange={handleChange(updateFn, maxInt)}
				onBlur={() => {
					setHasFocus(false);
					onBlur && onBlur();
				}}
				meta={meta}
				maxLength={maxLength}
				isError={meta && meta.touched && meta.error}
				accessibilityHelper={!hasFocus ? helper : null}
				name={name}
			/>
		</label>
	);
};

type InputDateProps = FieldRenderProps<string> & FieldExtraProps;
interface InputDateComponentProps extends InputDateProps {
	hideDay?: boolean;
	hideMonth?: boolean;
	hiddenLabel?: string;
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
		hiddenLabel = '',
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

		const hasValue = (): boolean => {
			return (
				(!hideDay && day !== '') || (!hideMonth && month !== '') || year !== ''
			);
		};

		const isError: boolean = meta && meta.touched && meta.error;
		const hiddenLabelId = HiddenLabelIdGenerator(hiddenLabel);

		const helper = new AccessibilityHelper(id, !!label, !!hint, hiddenLabelId);

		return (
			<StyledInputLabel
				id={id}
				isError={meta && meta.touched && meta.error}
				element="fieldset"
				onBlur={(e: React.FocusEvent<HTMLFieldSetElement>) => {
					if (
						(required || hasValue()) &&
						e.relatedTarget &&
						!e.currentTarget.outerHTML.includes(
							(e.relatedTarget as HTMLElement).outerHTML,
						)
					) {
						//date component losing focus
						input.onBlur();
					}
				}}
				data-testid={`date-input-${testId}`}
				aria-labelledby={helper.labelId}
				aria-describedby={
					isError
						? helper.formatAriaDescribedBy(isError)
						: !label && hiddenLabel !== ''
						? hiddenLabelId
						: hint
						? helper.hintId
						: helper.labelId
				}
				cfg={Object.assign({ mt: 1, py: 1 }, cfg)}
				hiddenLabel={hiddenLabel}
				hiddenLabelId={hiddenLabelId}
			>
				<InputElementHeading
					element="legend"
					label={label}
					required={required}
					hint={hint}
					meta={meta}
					accessibilityHelper={helper}
					errorRole="alert"
				/>

				<Flex>
					{!hideDay && (
						<DateInputField
							id={`dd-${id}`}
							parentId={id}
							label="Day"
							testId={`dd-${testId}`}
							value={day}
							updateFn={(dd: number) => setState({ dd })}
							maxInt={32}
							meta={meta}
							disabled={disabled}
							readOnly={readOnly}
							required={required}
							maxLength={2}
							name={input.name}
						/>
					)}
					{!hideMonth && (
						<DateInputField
							id={`mm-${id}`}
							parentId={id}
							label="Month"
							testId={`mm-${testId}`}
							value={month}
							updateFn={(mm: number) => setState({ mm })}
							maxInt={13}
							meta={meta}
							disabled={disabled}
							readOnly={readOnly}
							required={required}
							maxLength={2}
							name={input.name}
						/>
					)}
					<DateInputField
						id={`yyyy-${id}`}
						parentId={id}
						label="Year"
						small={false}
						testId={`yyyy-${testId}`}
						value={year}
						updateFn={(yyyy: number) => setState({ yyyy })}
						maxInt={10000}
						meta={meta}
						disabled={disabled}
						readOnly={readOnly}
						required={required}
						maxLength={4}
						name={input.name}
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
