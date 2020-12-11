import React from 'react';
import styles from './buttons.module.scss';
import {
	SpaceProps,
	ColorProps,
	TypographyProps,
	LayoutProps,
} from '../globals/globals';
import { useClassNames } from '../../hooks/use-class-names';

export type ButtonProps = {
	className?: string;
	cfg?: SpaceProps;
	appearance?: 'primary' | 'outlined';
	intent?: 'none' | 'success' | 'warning' | 'danger' | 'special';
	size?: 'small' | 'medium' | 'large';
	before?: any;
	after?: any;
	disabled?: boolean;
	loading?: boolean;
	type?: 'button' | 'submit';
	testId?: string;
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
	testId,
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
			data-testid={testId}
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
	cfg?: SpaceProps & ColorProps & TypographyProps & LayoutProps;
	className?: string;
	underline?: boolean;
	testId?: string;
	anchorTag?: boolean;
	buttonAppearance?: boolean;
	appearance?: 'primary' | 'outlined';
	intent?: 'none' | 'success' | 'warning' | 'danger' | 'special';
	size?: 'small' | 'medium' | 'large';
	[key: string]: any;
};
export const Link: React.FC<LinkProps> = ({
	cfg: globalStyles,
	underline = false,
	className,
	testId,
	anchorTag,
	buttonAppearance,
	appearance = 'primary',
	intent = 'none',
	size = 'medium',
	children,
	...props
}) => {
	const classNames = buttonAppearance ? useClassNames(globalStyles, [
		styles.button,
		styles[`appearance-${appearance}`],
		styles[`intent-${intent}`],
		styles[`size-${size}`],
		buttonAppearance && styles[`link-button-${size}`],
		className,
	])
	: useClassNames(globalStyles, [
		styles.link,
		{ [styles['link-underline']]: underline },
		className,
	]);

	return React.createElement(
		anchorTag ? 'a' :	'button',
		{
			type: anchorTag ? null : 'button',
			'data-testid': testId,
			className: classNames,
			...props,
		},
		children,
	);
};
