import React from 'react';
import { classNames, Flex, toKebabCase } from '@tpr/core';
import styles from './input.module.scss';
import AccessibilityHelper from '../accessibilityHelper';

export type InputProps = {
	id?: string;
	type: string;
	testId?: string;
	label?: string;
	isError?: boolean;
	after?: string;
	before?: string;
	decimalPlaces?: number;
	readOnly?: boolean;
	ariaLabelExtension?: string;
	[key: string]: any;
	accessibilityHelper?: AccessibilityHelper;
	required?: boolean;
	autoComplete?: string;
};

export const Input: React.FC<InputProps> = React.forwardRef<
	HTMLInputElement,
	InputProps
>(
	(
		{
			id,
			type = 'text',
			testId,
			name,
			label,
			isError = false,
			className,
			readOnly,
			autoComplete,
			after: After,
			before: Before,
			decimalPlaces,
			ariaLabelExtension,
			accessibilityHelper,
			required = false,
			...rest
		},
		ref,
	) => {
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
				className={classNames([
					styles.inputWrapper,
					After ? styles['input-wrapper_relative'] : '',
				])}
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
					ref={ref}
					type={type}
					data-testid={testId}
					readOnly={readOnly}
					autoComplete={autoComplete}
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
	},
);
