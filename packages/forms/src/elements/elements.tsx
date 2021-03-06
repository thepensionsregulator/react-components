import React, { createElement, ReactNode } from 'react';
import { SpaceProps, FlexProps, useClassNames, Span } from '@tpr/core';
import AccessibilityHelper from './accessibilityHelper';
import styles from './elements.module.scss';

interface StyledInputLabelProps {
	element?: 'label' | 'div' | 'fieldset';
	isError?: boolean;
	className?: string;
	cfg?: FlexProps | SpaceProps;
	[key: string]: any;
	noLeftBorder?: boolean;
	hiddenLabel?: string;
	hiddenLabelId?: string;
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

interface FormLabelTextProps {
	element?: 'div' | 'legend' | 'label' | null;
	id?: string;
	className?: string;
	labelNotBold?: boolean;
}

export const FormLabelText: React.FC<FormLabelTextProps> = ({
	element = 'div',
	id = null,
	children,
	labelNotBold,
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
		},
		children,
	);
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ id, children }) => (
	<p id={id} className={styles.errorMessage} role="alert">
		{children}
	</p>
);

type ErrorMessageProps = {
	id?: string;
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
};
export const InputElementHeading: React.FC<InputElementHeadingProps> = ({
	element = 'div',
	label,
	required,
	hint,
	meta,
	accessibilityHelper,
	labelNotBold,
}) => {
	return (
		<>
			{label && (
				<FormLabelText
					element={element}
					id={accessibilityHelper.labelId}
					labelNotBold={labelNotBold}
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
				<ErrorMessage id={accessibilityHelper.errorId}>
					{meta.error}
				</ErrorMessage>
			)}
		</>
	);
};
