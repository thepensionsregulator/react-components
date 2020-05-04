import React from 'react';
import styles from './buttons.module.scss';
import { SpaceProps, ColorProps, TypographyProps } from '../globals/globals';
import useClassNames from '../../hooks/use-class-names';

type ButtonProps = {
	className?: string;
	cfg?: SpaceProps;
	appearance?: 'primary' | 'link' | 'outlined';
	intent?: 'none' | 'success' | 'warning' | 'danger';
	size?: 'small' | 'normal' | 'big';
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
	size = 'normal',
	before: Before,
	after: After,
	disabled,
	loading,
	type = 'button',
	...props
}) => {
	const classNames = useClassNames(globalStyles, [
		styles.initial,
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

type LinkProps = {
	cfg?: SpaceProps | ColorProps | TypographyProps;
	className?: string;
	underline?: boolean;
	[key: string]: any;
};
export const Link: React.FC<LinkProps> = ({
	cfg: globalStyles,
	underline = false,
	className,
	...props
}) => {
	const classNames = useClassNames(globalStyles, [
		styles.link,
		{ [styles['link-underline']]: underline },
		className,
	]);

	return React.createElement('button', {
		type: 'button',
		className: classNames,
		...props,
	});
};
