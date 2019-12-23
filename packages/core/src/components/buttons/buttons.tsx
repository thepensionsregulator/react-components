import React, { FunctionComponent } from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import { space } from 'styled-system';
import { SpaceProps } from 'styled-system';
import { getObjectValueByString } from '../../utils';

// TODO: get all params from the theme

const scales = {
	small: css`
		height: 32px;
		padding: 0 10px;
		font-size: 18px;
	`,
	normal: css`
		height: 38px;
		padding: 0 25px;
		font-size: 22px;
	`,
	big: css`
		height: 48px;
		padding: 0 30px;
		font-size: 32px;
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
			background: #eaeaea;
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
		box-shadow: 0 3px 0 0 #000;
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
			transform: translateY(3px);
			box-shadow: none;
		}
	`;
};

function appearances(themeColors, intent: Intent) {
	const colors = getObjectValueByString(themeColors, intent === 'none' ? 'accents' : intent);
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

type ButtonProps = Partial<ButtonConfigProps> & SpaceProps;

const StyledButton = styled.button.attrs<ButtonProps>(({ type = 'button' }) => ({
	type,
}))`
	${getScale}
	${getAppearance}

	display: inline-block;
	border-radius: 3px;
	cursor: pointer;

	${space}
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
