import React, { ChangeEvent } from 'react';
import { Flex, Button, ButtonProps, ColorProps, P } from '@tpr/core';
import { ArrowIcon } from './icons';
import styles from './buttons.module.scss';

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
				<P cfg={{ px: 4 }}>{disabledText}</P>
			) : (
				<Flex
					cfg={{
						alignItems: 'center',
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
