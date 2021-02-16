import React, { createElement } from 'react';
import { SpaceProps, FlexProps, useClassNames, Span } from '@tpr/core';
import styles from './elements.module.scss';
import { ReactNode } from 'react';

interface StyledInputLabelProps {
	element?: 'label' | 'div' | 'fieldset';
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

interface FormLabelTextProps {
	element?: 'div' | 'legend' | 'label' | null;
}

export const FormLabelText: React.FC<FormLabelTextProps> = ({ 	
	element = 'div',
	children 
}) => { 
	return createElement(
		element,
		{
			className: styles.labelText,
		},
		children,
	);
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ id, children }) => (
	<p id={id} className={styles.errorMessage}>
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
	errorId?: string;
	required?: boolean;
	hint?: string;
	meta?: any;
};
export const InputElementHeading: React.FC<InputElementHeadingProps> = ({
	element = 'div',
	label,
	errorId,
	required,
	hint,
	meta,
}) => {
	return (
		<>
			{label && (
				<FormLabelText element={element}>
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
