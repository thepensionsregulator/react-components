import React from 'react';
import { useClassNames } from '@tpr/core';
import { SVGProps } from './types';

export const SVG: React.FC<SVGProps> = ({
	cfg,
	fill = '',
	stroke = '',
	width = '24',
	className,
	viewBox = '0 0 24 24',
	testId,
	role = 'img',
	alternativeText,
	focusable = false,
	children,
}) => {
	const classNames = useClassNames(cfg, [className]);
	const uniqueId = [...Array(10)]
		.map(() => (~~(Math.random() * 36)).toString(36))
		.join('');
	return (
		<svg
			width={width}
			height={width}
			fill={fill}
			stroke={stroke}
			viewBox={viewBox}
			xmlns="http://www.w3.org/2000/svg"
			className={classNames}
			xmlnsXlink="http://www.w3.org/1999/xlink"
			data-testid={testId}
			role={role}
			focusable={focusable}
			aria-hidden={alternativeText ? undefined : 'true'}
			aria-labelledby={alternativeText ? uniqueId : undefined}
		>
			{alternativeText && <title id={uniqueId}>{alternativeText}</title>}
			{children}
		</svg>
	);
};
