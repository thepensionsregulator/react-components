import React, { ChangeEvent } from 'react';
import { Flex, P, Button, ButtonProps } from '@tpr/core';
import { ArrowIcon } from './icons';
import styles from './buttons.module.scss';

// TODO: update icon colors from the theming variables once ready.

interface ArrowButtonProps extends ButtonProps {
	title: string;
	loadingMessage?: string;
	type?: 'button' | 'submit';
	onClick: (evt: ChangeEvent<HTMLInputElement>) => void;
	pointsTo?: 'left' | 'up' | 'right' | 'down';
	iconSide?: 'left' | 'right';
}
export const ArrowButton: React.FC<ArrowButtonProps> = ({
	intent,
	appearance,
	type = 'button',
	onClick,
	disabled,
	loadingMessage = 'Saving...',
	title,
	cfg,
	pointsTo = 'left',
	iconSide = 'left',
	testId,
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
			{disabled ? (
				loadingMessage
			) : (
				<Flex
					cfg={{
						alignItems: 'center',
						pl: iconSide === 'left' ? 2 : 4,
						pr: iconSide === 'right' ? 2 : 4,
					}}
				>
					{iconSide === 'left' && (
						<ArrowIcon pointsTo={pointsTo} fill="white" size="32" />
					)}
					<>{title}</>
					{iconSide === 'right' && (
						<ArrowIcon pointsTo={pointsTo} fill="white" size="32" />
					)}
				</Flex>
			)}
		</Button>
	);
};
