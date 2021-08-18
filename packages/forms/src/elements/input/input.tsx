import React from 'react';
import { classNames, Flex, LayoutProps, toKebabCase } from '@tpr/core';
import styles from './input.module.scss';
import AccessibilityHelper from '../accessibilityHelper';

export type InputProps = {
	id?: string;
	type: string;
	width?: LayoutProps['width'];
	testId?: string;
	label?: string;
	isError?: boolean;
	after?: string;
	before?: string;
	decimalPlaces?: number;
	parentRef?: any;
	readOnly?: boolean;
	ariaLabelExtension?: string;
	[key: string]: any;
	accessibilityHelper?: AccessibilityHelper;
	required?: boolean;
};

export const Input: React.FC<InputProps> = ({
	id,
	type = 'text',
	width,
	testId,
	name,
	label,
	isError = false,
	className,
	readOnly,
	after: After,
	before: Before,
	decimalPlaces,
	parentRef,
	ariaLabelExtension,
	accessibilityHelper,
	required = false,
	...rest
}) => {
	const getAriaLabel = (): string => {
		var ariaLabel = rest['aria-label'] ?? label;

		if (!ariaLabelExtension) {
			return ariaLabel;
		}

		if (/^[a-z0-9]/i.test(ariaLabelExtension)) {
			ariaLabel = ariaLabel + ' ';
		}

		return `${ariaLabel}${ariaLabelExtension}`;
	};

	return (
		<Flex
			cfg={{ flex: width ? '0 0 auto' : '1 1 auto', width }}
			className={After ? styles['input-wrapper_relative'] : ''}
		>
			{Before && (
				<span
					className={styles.before}
					id={name && toKebabCase(name) + '-before'}
					aria-label={Before.match('£') ? 'in pounds' : ''}
				>
					{Before}
				</span>
			)}
			<input
				id={id}
				ref={parentRef}
				type={type}
				data-testid={testId}
				readOnly={readOnly}
				step={
					type !== 'number'
						? null
						: decimalPlaces
						? Math.pow(10, -decimalPlaces)
						: 1
				}
				className={classNames([
					styles.inputText,
					className,
					{
						[styles['inputText-error']]: isError,
					},
				])}
				required={required}
				aria-invalid={!!isError}
				aria-describedby={
					accessibilityHelper &&
					accessibilityHelper.formatAriaDescribedBy(isError)
				}
				{...rest}
				name={name}
				aria-label={getAriaLabel()}
			/>
			{After && (
				<span
					className={styles.after}
					id={name && toKebabCase(name) + '-after'}
				>
					{After}
				</span>
			)}
		</Flex>
	);
};
