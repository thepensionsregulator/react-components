import React, { createElement } from 'react';
import { SpaceProps, FlexProps, useClassNames, Span } from '@tpr/core';
import styles from './elements.module.scss';

interface StyledInputLabelProps {
	element?: 'label' | 'div';
	isError?: boolean;
	className?: string;
	cfg?: FlexProps | SpaceProps;
	[key: string]: any;
}
export const StyledInputLabel: React.FC<StyledInputLabelProps> = ({
	element = 'label',
	cfg,
	isError,
	className,
	children,
	...props
}) => {
	const classNames = useClassNames(cfg, [
		styles.label,
		{ [styles['labelError']]: isError },
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

export const ErrorMessage: React.FC = ({ children }) => (
	<div className={styles.errorMessage}>{children}</div>
);

type InputElementHeadingProps = {
	label?: string;
	required?: boolean;
	hint?: string;
	meta?: any;
};
export const InputElementHeading: React.FC<InputElementHeadingProps> = ({
	label,
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
				<Span cfg={{ mb: 2, fontSize: 2, color: 'neutral.6' }}>{hint}</Span>
			)}
			{meta && meta.touched && meta.error && (
				<ErrorMessage>{meta.error}</ErrorMessage>
			)}
		</>
	);
};
