import React from 'react';
import { classNames, Flex, LayoutProps } from '@tpr/core';
import styles from './input.module.scss';
export type InputProps = {
	type: string;
	width?: LayoutProps['width'];
	testId?: string;
	errorId?: string;
	label?: string;
	touched?: boolean;
	after?: string;
	before?: string;
	decimalPlaces?: number;
	parentRef?: any;
	readOnly?: boolean;
	ariaLabelExtension?: string;
	[key: string]: any;
};

export const Input: React.FC<InputProps> = ({
	type = 'text',
	width,
	testId,
	errorId,
	label,
	touched = false,
	className,
	readOnly,
	after: After,
	before: Before,
	decimalPlaces,
	parentRef,
	ariaLabelExtension,
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
			{Before && <span className={styles.before}>{Before}</span>}
			<input
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
						[styles['inputText-error']]: touched,
					},
				])}
				aria-invalid={touched != false}
				aria-describedby={touched != false ? errorId : ''}
				{...rest}
				aria-label={getAriaLabel()}
			/>
			{After && <span className={styles.after}>{After}</span>}
		</Flex>
	);
};
