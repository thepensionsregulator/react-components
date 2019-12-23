import React, { FunctionComponent } from 'react';
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
		height: ${({ theme }) => theme.space[5]}px;
		padding: 0 32px;
		font-size: ${({ theme }) => theme.fontSizes[4]}px;
	`,
	big: css`
		height: ${({ theme }) => theme.space[6]}px;
		padding: 0 38px;
		font-size: ${({ theme }) => theme.fontSizes[5]}px;
	`,
};

const defaultAppearance = colors => {
	return css`
		background: transparent;
		box-shadow: none;
		border: none;
		color: ${colors?.[200]};
		border: none;
		text-decoration: underline;
		padding-left: 0px;
		padding-right: 0px;

		&:hover {
			color: ${colors?.[300]};
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
		box-shadow: 0 2px 0 0 #222;
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
			transform: translateY(2px);
			box-shadow: none;
		}
	`;
};

function appearances(themeColors, intent: Intent) {
	const colors = themeColors[intent === 'none' ? 'neutral' : intent];
	return {
		default: defaultAppearance(colors),
		primary: primaryAppearance(colors),
	};
}

const getAppearance = <T extends ButtonConfigProps & { theme: DefaultTheme }>({
	theme,
	appearance = 'default',
	intent = 'none',
}: T) => appearances(theme.colors, intent)[appearance];

const getScale = ({ scale = 'normal' }): string => scales[scale];

type Intent = 'none' | 'success' | 'warning' | 'danger';
type Appearance = 'default' | 'primary';
type Scale = 'small' | 'normal' | 'big';

type ButtonConfigProps = {
	intent: Intent;
	appearance: Appearance;
	scale: Scale;
	isLoading: boolean;
	iconBefore: FunctionComponent<{ style: any }>;
	iconAfter: FunctionComponent<{ style: any }>;
	disabled: boolean;
};

type ButtonProps = Partial<ButtonConfigProps> & SpaceProps & LayoutProps;

const StyledButton = styled.button.attrs<ButtonProps>(({ type = 'button' }) => ({
	type,
}))`
	${getScale}
	${getAppearance}

	display: inline-block;
	cursor: pointer;

	${space}
	${layout}
`;

export const Button: React.FC<ButtonProps> = ({ children, iconAfter, iconBefore, ...props }) => {
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
