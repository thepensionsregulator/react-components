import React, { createElement } from 'react';
import {
	SpaceProps,
	FlexProps,
	useClassNames,
	Span,
} from '@tpr/core';
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
	id?: string;
}

export const FormLabelText: React.FC<FormLabelTextProps> = ({
	element = 'div',
	id = null,
	children,
}) => {
	return createElement(
		element,
		{
			id: id,
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
	labelId?: string;
	hintId?: string;
	errorId?: string;
	required?: boolean;
	hint?: string;
	meta?: any;
};
export const InputElementHeading: React.FC<InputElementHeadingProps> = ({
	element = 'div',
	label,
	labelId,
	hintId,
	errorId,
	required,
	hint,
	meta}) => {
	return (
		<>
			{label && (
				<FormLabelText
					element={element}
					id={labelId}
				>
					{label} {!required && '(optional)'}
				</FormLabelText>
			)}
			{hint && (
				<Span id={hintId} cfg={{ mb: 2 }} className={styles.hint}>
					{hint}
				</Span>
			)}
			{meta && meta.touched && meta.error && (
				<ErrorMessage id={errorId}>{meta.error}</ErrorMessage>
			)}
		</>
	);
};

const getLabelId = (rootId: string): string => {
	return rootId && `${rootId}-label` || null;
};
const getHintId = (rootId: string): string => {
	return rootId && `${rootId}-hint` || null;
};
const getErrorId = (rootId: string): string => {
	return rootId && `${rootId}-error` || null;
};

export type InputElementDescriptorProps = {
	labelId?: string;
	hintId?: string;
	errorId?: string;
}

export const getElementDescriptors = (rootId: string, hasLabel: boolean, hasHint: boolean): InputElementDescriptorProps => {
	const labelId = hasLabel? getLabelId(rootId): null;
	const hintId = hasHint? getHintId(rootId): null;
	const errorId = getErrorId(rootId);
	return {
		labelId: labelId,
		hintId: hintId,
		errorId: errorId,
	} as InputElementDescriptorProps;
}	

export const formatAriaDescribedBy = (hintId: string, errorId: string, isError: boolean) => {
	var describedBy: string;
	if (isError) {
		describedBy =  `${hintId || ''} ${errorId || ''}`
	}
	else {
		describedBy = `${hintId || ''}`
	}
	return describedBy.trim() || null;
}
