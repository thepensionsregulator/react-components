import React, { ChangeEvent } from 'react';
import { Flex, Button, ButtonProps, ColorProps, Span } from '@tpr/core';
import { ArrowIcon } from './icons';
import styles from './buttons.module.scss';
import { Cross } from '@tpr/icons';

export interface ArrowButtonProps extends ButtonProps {
	title: string;
	disabledText?: string;
	type?: 'button' | 'submit';
	onClick?: (evt: ChangeEvent<HTMLInputElement>) => void;
	pointsTo?: 'left' | 'up' | 'right' | 'down';
	iconSide?: 'left' | 'right';
	iconColor?: ColorProps['fill'];
}
export const ArrowButton: React.FC<ArrowButtonProps> = ({
	intent,
	appearance,
	type = 'button',
	onClick = undefined,
	disabled,
	disabledText,
	title,
	cfg,
	pointsTo = 'left',
	iconSide = 'left',
	testId,
	iconColor = 'white',
}) => {
	return (
		<Button
			intent={intent}
			appearance={appearance}
			type={type}
			onClick={onClick}
			disabled={disabled}
			cfg={cfg}
			testId={testId}
			className={styles.removepadding}
		>
			{disabled && disabledText ? (
				<Span cfg={{ px: 4 }}>{disabledText}</Span>
			) : (
				<Flex
					cfg={{
						alignItems: 'center',
						justifyContent: 'center',
						pl: iconSide === 'left' ? 2 : 4,
						pr: iconSide === 'right' ? 2 : 4,
					}}
				>
					{iconSide === 'left' && (
						<ArrowIcon pointsTo={pointsTo} fill={iconColor} size="32" />
					)}
					<>{title}</>
					{iconSide === 'right' && (
						<ArrowIcon pointsTo={pointsTo} fill={iconColor} size="32" />
					)}
				</Flex>
			)}
		</Button>
	);
};

type CrossButtonProps = {
	colour: 'white' | 'black';
	onClick: () => void;
};

export const CrossButton: React.FC<CrossButtonProps> = ({
	onClick,
	colour,
}) => {
	return (
		<button type={'button'} onClick={onClick} className={styles.crossButton}>
			<Cross colour={colour} svgProps={{ role: 'img', ariaLabel: 'Close' }} />
		</button>
	);
};
