import React from 'react';
import styles from './buttons.module.scss';
import { SpaceProps, ColorProps, TypographyProps } from '../globals/globals';
import { useClassNames } from '../../hooks/use-class-names';

export type ButtonProps = {
	className?: string;
	cfg?: SpaceProps;
	appearance?: 'primary' | 'outlined';
	intent?: 'none' | 'success' | 'warning' | 'danger';
	size?: 'small' | 'medium' | 'large';
	before?: any;
	after?: any;
	disabled?: boolean;
	loading?: boolean;
	type?: 'button' | 'submit';
	[key: string]: any;
};
export const Button: React.FC<ButtonProps> = ({
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
	type = 'button',
	...props
}) => {
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
};

export type LinkProps = {
	cfg?: SpaceProps | ColorProps | TypographyProps;
	className?: string;
	underline?: boolean;
	[key: string]: any;
};
export const Link: React.FC<LinkProps> = ({
	cfg: globalStyles,
	underline = false,
	className,
	children,
	...props
}) => {
	const classNames = useClassNames(globalStyles, [
		styles.link,
		{ [styles['link-underline']]: underline },
		className,
	]);

	return React.createElement(
		'button',
		{
			type: 'button',
			className: classNames,
			...props,
		},
		children,
	);
};
