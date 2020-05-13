import React, { createElement } from 'react';
import { SpaceProps, FlexProps, useClassNames, Span } from '@tpr/core';
import styles from './elements.module.scss';

interface StyledInputLabelProps {
	isError?: boolean;
	className?: string;
	cfg?: FlexProps | SpaceProps;
	[key: string]: any;
}
export const StyledInputLabel: React.FC<StyledInputLabelProps> = ({
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
		'label',
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
			{hint && <Span cfg={{ mb: 1, color: 'neutral.3' }}>{hint}</Span>}
			{meta && meta.touched && meta.error && (
				<ErrorMessage>{meta.error}</ErrorMessage>
			)}
		</>
	);
};
