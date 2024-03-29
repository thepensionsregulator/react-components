import React from 'react';
import { SpaceProps } from '../globals/globals';
import { useClassNames } from '../../hooks/use-class-names';
import styles from './buttons.module.scss';

export type ButtonProps = {
	className?: string;
	cfg?: SpaceProps;
	appearance?: 'primary' | 'secondary' | 'outlined';
	intent?: 'none' | 'success' | 'warning' | 'danger' | 'special' | 'white';
	size?: 'small' | 'medium' | 'large';
	before?: any;
	after?: any;
	disabled?: boolean;
	loading?: boolean;
	type?: 'button' | 'submit';
	testId?: string;
	[key: string]: any;
};
export const Button: React.FC<ButtonProps> = React.forwardRef<
	HTMLInputElement,
	ButtonProps
>(
	(
		{
			children,
			cfg: globalStyles = {},
			className,
			appearance = 'primary',
			intent = 'none',
			size = 'medium',
			before: Before,
			after: After,
			disabled,
			loading,
			testId,
			type = 'button',
			...props
		},
		ref,
	) => {
		const classNames = useClassNames(globalStyles, [
			styles.button,
			styles[`appearance-${appearance}`],
			styles[`intent-${intent}`],
			styles[`size-${size}`],
			className,
		]);
		return (
			<button
				type={type}
				disabled={disabled || loading}
				className={classNames}
				data-testid={testId}
				ref={ref}
				{...props}
			>
				{loading ? (
					'Loading...'
				) : (
					<>
						{Before && <Before />}
						{children}
						{After && <After />}
					</>
				)}
			</button>
		);
	},
);
