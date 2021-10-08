import React, { createElement, ReactNode } from 'react';
import { SpaceProps, FlexProps, useClassNames, Span } from '@tpr/core';
import AccessibilityHelper from './accessibilityHelper';
import styles from './elements.module.scss';
import { useField } from '../../lib';

interface BaseStyledInputLabelProps {
	element?: 'label' | 'div' | 'fieldset';
	className?: string;
	cfg?: FlexProps | SpaceProps;
	noLeftBorder?: boolean;
	hiddenLabelId?: string;
	hiddenLabel?: string;
	[key: string]: any;
}

interface StyledInputLabelSubscriptionProps extends BaseStyledInputLabelProps {
	fieldNames: string[];
}

interface StyledInputLabelProps extends BaseStyledInputLabelProps {
	isError?: boolean;
}
export const StyledInputLabel: React.FC<StyledInputLabelProps> = ({
	element = 'label',
	cfg,
	isError,
	className,
	children,
	noLeftBorder,
	hiddenLabel = '',
	hiddenLabelId,
	...props
}) => {
	const classNames = useClassNames(cfg, [
		styles.label,
		{ [styles['labelError']]: isError && !noLeftBorder },
		className,
	]);
	return createElement(
		element,
		{
			className: classNames,
			...props,
		},

		<>
			{hiddenLabel && (
				<div className={styles.hiddenLabel} id={hiddenLabelId}>
					{hiddenLabel}
				</div>
			)}
			{children}
		</>,
	);
};

export const StyledInputLabelWithSubscription: React.FC<StyledInputLabelSubscriptionProps> = ({
	fieldNames,
	cfg,
	noLeftBorder,
	className,
	element = 'label',
	hiddenLabel = '',
	hiddenLabelId,
	children,
	...props
}) => {
	const {
		meta: { touched, error },
	} = useField(fieldNames[0]);
	const classNames = useClassNames(cfg, [
		styles.label,
		{ [styles['labelError']]: touched && error && !noLeftBorder },
		className,
	]);
	return createElement(
		element,
		{
			className: classNames,
			...props,
		},
		<>
			{hiddenLabel && (
				<div className={styles.hiddenLabel} id={hiddenLabelId}>
					{hiddenLabel}
				</div>
			)}
			{children}
		</>,
	);
};

interface FormLabelTextProps {
	element?: 'div' | 'legend' | 'label' | null;
	id?: string;
	className?: string;
	labelNotBold?: boolean;
	forId?: string;
}

export const FormLabelText: React.FC<FormLabelTextProps> = ({
	element = 'div',
	id = null,
	children,
	labelNotBold,
	forId,
}) => {
	const classNames = useClassNames({}, [
		styles.labelText,
		labelNotBold && styles.labelNoBold,
	]);
	return createElement(
		element,
		{
			id: id,
			className: classNames,
			htmlFor: forId,
		},
		children,
	);
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
	id,
	children,
	role,
}) => (
	<p id={id} className={styles.errorMessage} role={role}>
		{children}
	</p>
);

// `role` is optional because, for an error related to a single field, linking it to the error using aria-describedby works best.
// For a multi-field entry with a combined error (date) it works better to use role="alert".
type ErrorMessageProps = {
	id?: string;
	role?: 'alert' | undefined;
	children: ReactNode;
};

type InputElementHeadingProps = {
	element?: 'div' | 'legend' | null;
	label?: string;
	required?: boolean;
	hint?: string;
	meta?: any;
	accessibilityHelper: AccessibilityHelper;
	labelNotBold?: boolean;
	errorRole?: 'alert' | undefined;
	forId?: string;
};
export const InputElementHeading: React.FC<InputElementHeadingProps> = ({
	element = 'div',
	label,
	required,
	hint,
	meta,
	accessibilityHelper,
	labelNotBold,
	errorRole,
	forId,
}) => {
	return (
		<>
			{label && (
				<FormLabelText
					element={element}
					id={accessibilityHelper.labelId}
					labelNotBold={labelNotBold}
					forId={forId}
				>
					{label} {!required && '(optional)'}
				</FormLabelText>
			)}
			{hint && (
				<Span
					id={accessibilityHelper.hintId}
					cfg={{ mb: 2 }}
					className={styles.hint}
				>
					{hint}
				</Span>
			)}
			{meta && meta.touched && meta.error && (
				<ErrorMessage id={accessibilityHelper.errorId} role={errorRole}>
					{meta.error}
				</ErrorMessage>
			)}
		</>
	);
};
