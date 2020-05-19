import React from 'react';
import { Flex, H3, H4, P, Button, classNames } from '@tpr/core';
import styles from './card.module.scss';

type StyledCardProps = { complete: boolean };
export const StyledCard: React.FC<StyledCardProps> = ({
	complete = false,
	children,
}) => {
	return (
		<div
			className={classNames([
				styles.card,
				{ [styles['card-completed']]: complete },
			])}
		>
			{children}
		</div>
	);
};

export const StyledCardToolbar: React.FC = ({ children }) => {
	return <div className={styles.cardToolbar}>{children}</div>;
};

type ToolbarProps = { title: string };
export const Toolbar: React.FC<ToolbarProps> = ({ title }) => {
	return (
		<Flex
			cfg={{ flexDirection: 'column', mt: 4, mb: 3, pb: 2 }}
			className={styles.toolbarBottomBorder}
		>
			<P cfg={{ color: 'neutral.3', fontSize: 3 }}>Edit trustee</P>
			<H3 cfg={{ fontWeight: 3 }}>{title}</H3>
		</Flex>
	);
};

type FooterProps = {
	onContinue?: {
		type?: 'button' | 'submit';
		title?: string;
		appearance?: 'primary' | 'outlined';
		intent?: 'none' | 'success' | 'warning' | 'danger';
		fn?: (...args: any[]) => void;
	};
	onSave?: {
		type?: 'button' | 'submit';
		title?: string;
		appearance?: 'primary' | 'outlined';
		intent?: 'none' | 'success' | 'warning' | 'danger';
		fn?: (...args: any[]) => void;
	};
	isDisabled?: boolean;
};

export const Footer: React.FC<FooterProps> = ({
	onContinue,
	onSave,
	isDisabled = false,
}) => {
	return (
		<Flex
			cfg={{
				flex: '0 0 auto',
				flexDirection: 'column',
				alignItems: 'flex-start',
				justifyContent: 'flex-start',
				mt: 5,
			}}
			// height={100}
		>
			{onContinue && (
				<Button
					intent={onContinue?.intent}
					appearance={onContinue?.appearance}
					type={onContinue?.type}
					onClick={onContinue.fn}
					disabled={isDisabled}
				>
					{isDisabled ? (
						<Flex cfg={{ alignItems: 'center' }} height="100%">
							{/* <Spinner size={22} /> */}
							<P cfg={{ ml: 1 }}>Saving...</P>
						</Flex>
					) : (
						onContinue.title
					)}
				</Button>
			)}
			{onSave && (
				<Button
					intent={onSave?.intent}
					appearance={onSave?.appearance}
					type={onSave?.type}
					onClick={onSave.fn}
					disabled={isDisabled}
					ml={onContinue && 1}
				>
					{isDisabled ? (
						<Flex cfg={{ alignItems: 'center' }} height="100%">
							{/* <Spinner size={22} /> */}
							<P cfg={{ ml: 1 }}>Saving...</P>
						</Flex>
					) : (
						onSave.title
					)}
				</Button>
			)}
		</Flex>
	);
};
