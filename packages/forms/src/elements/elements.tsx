import React, { createElement } from 'react';
import { SpaceProps, FlexProps, useClassNames, Span } from '@tpr/core';
import styles from './elements.module.scss';
import { ReactNode } from 'react';

interface StyledInputLabelProps {
	element?: 'label' | 'div';
	isError?: boolean;
	className?: string;
	cfg?: FlexProps | SpaceProps;
	[key: string]: any;
	noLeftBorder?: boolean;
}
export const StyledInputLabel: React.FC<StyledInputLabelProps> = ({
	element = 'label',
	cfg,
	isError,
	className,
	children,
	noLeftBorder,
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
		children,
	);
};

export const FormLabelText: React.FC = ({ children }) => (
	<div className={styles.labelText}>{children}</div>
);

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ id, children }) => (
	<div id={id} className={styles.errorMessage}>
		{children}
	</div>
);

type ErrorMessageProps = {
	id?: string;
	children: ReactNode;
};

type InputElementHeadingProps = {
	label?: string;
	errorId?: string;
	required?: boolean;
	hint?: string;
	meta?: any;
};
export const InputElementHeading: React.FC<InputElementHeadingProps> = ({
	label,
	errorId,
	required,
	hint,
	meta,
}) => {
	return (
		<>
			{label && (
				<FormLabelText>
					{label} {!required && '(optional)'}
				</FormLabelText>
			)}
			{hint && (
				<Span cfg={{ mb: 2 }} className={styles.hint}>
					{hint}
				</Span>
			)}
			{meta && meta.touched && meta.error && (
				<ErrorMessage id={errorId}>{meta.error}</ErrorMessage>
			)}
		</>
	);
};
