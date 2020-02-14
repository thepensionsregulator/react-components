import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import { space, layout } from 'styled-system';
import { SpaceProps, LayoutProps } from 'styled-system';
// import { getObjectValueByString } from '../../utils';

// TODO: get all params from the theme

const scales = {
	small: css`
		height: ${({ theme }) => theme.space[4]}px;
		padding: 0 15px;
		font-size: ${({ theme }) => theme.fontSizes[2]}px;
	`,
	normal: css`
		height: ${({ theme }) => theme.space[6]}px;
		padding: 0 32px;
		font-size: ${({ theme }) => theme.fontSizes[2]}px;
	`,
	big: css`
		height: ${({ theme }) => theme.space[6]}px;
		padding: 0 38px;
		font-size: ${({ theme }) => theme.fontSizes[5]}px;
	`,
};

const linkAppearance = colors => {
	return css`
		background: transparent;
		box-shadow: none;
		border: none;
		color: ${colors?.[200]};
		border: none;
		text-decoration: none;
		padding-right: 0;
		padding-left: 0;

		&:hover {
			color: ${colors?.[300]};
			text-decoration: underline;
		}

		&:focus {
		}

		&:disabled {
		}

		&:active {
		}
	`;
};

const primaryAppearance = colors => {
	return css`
		background: ${colors?.[200]};
		color: white;
		border: none;
		outline: none;

		&:hover {
			background: ${colors?.[300]};
		}

		&:focus {
		}

		&:disabled {
			background: grey;
			cursor: not-allowed;
		}

		&:active {
			background: ${colors?.[400]};
			box-shadow: none;
		}
	`;
};

const outlinedAppearance = colors => {
	return css`
		background: transparent;
		color: ${colors?.[200]};
		border: 1px solid ${colors?.[200]};
		outline: none;

		&:hover {
			color: white;
			background: ${colors?.[200]};
		}

		&:focus {
		}

		&:disabled {
			background: grey;
			cursor: not-allowed;
		}

		&:active {
			box-shadow: none;
		}
	`;
};

function appearances(themeColors: DefaultTheme['colors'], intent: Intent) {
	const colors = themeColors[intent === 'none' ? 'primary' : intent];
	return {
		primary: primaryAppearance(colors),
		outlined: outlinedAppearance(colors),
		link: linkAppearance(colors),
	};
}

const getAppearance = <T extends ButtonConfigProps & { theme: DefaultTheme }>({
	theme,
	appearance = 'primary',
	intent = 'none',
}: T) => appearances(theme.colors, intent)[appearance];

const getScale = ({ scale = 'normal' }): string => scales[scale];

type Intent = 'none' | 'success' | 'warning' | 'danger';
type Appearance = 'primary' | 'link' | 'outlined';
type Scale = 'small' | 'normal' | 'big';

type ButtonConfigProps = {
	/** determins button color from theme */
	intent: Intent;
	/** determins button style */
	appearance: Appearance;
	/** determins button size */
	scale: Scale;
	/** button loading state */
	isLoading: boolean;
	/** icon JSX component before text */
	iconBefore: FunctionComponent<{ style: any }>;
	/** icon JSX component after text */
	iconAfter: FunctionComponent<{ style: any }>;
	disabled: boolean;
};

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		Partial<ButtonConfigProps>,
		SpaceProps,
		LayoutProps {}

const StyledButton = styled('button').attrs<ButtonProps>(
	({ type = 'button' }) => ({
		type,
	}),
)`
	${getScale}
	${getAppearance}

	display: inline-block;
	cursor: pointer;

	${space}
	${layout}
`;

export const Button: React.FC<ButtonProps> = ({
	children,
	iconAfter,
	iconBefore,
	...props
}) => {
	return (
		<StyledButton disabled={props.isLoading} {...props}>
			{iconBefore && iconBefore({ style: { marginRight: 10 } })}
			<span>{children}</span>
			{iconAfter && iconAfter({ style: { marginLeft: 10 } })}
		</StyledButton>
	);
};

export const IconButton = () => null;
export const BackButton = () => null;
