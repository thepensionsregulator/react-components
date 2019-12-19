import React from 'react';
import styled from 'styled-components';
import { space } from 'styled-system';
import { SpaceProps } from 'styled-system';
import { getObjectValueByString } from '../../utils';

type ButtonConfigProps = {
	intent: 'none' | 'success' | 'warning' | 'danger';
	appearance: 'default' | 'primary' | 'minimal';
	isLoading: boolean;
	isActive: boolean;
	iconBefore: string;
	iconAfter: string;
	disabled: boolean;
};

type ButtonProps = Partial<ButtonConfigProps> & SpaceProps;

const StyledButton = styled.button.attrs<ButtonProps>(
	({ theme, appearance = 'default', intent = 'none', type = 'button' }) => ({
		intent,
		type,
		scheme: getObjectValueByString(theme, 'colors.'.concat(appearance || 'accents.features')),
	}),
)`
	background: transparent;
	padding: 10px 20px;
	border-radius: 4px;
	border: 1px solid #eee;
	cursor: pointer;

	&:focus {
	}

	&:hover {
	}

	&:disabled {
	}

	${space}
`;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
	return (
		<StyledButton {...props} disabled={props.isLoading}>
			{children}
		</StyledButton>
	);
};

export const IconButton = () => null;
export const BackButton = () => null;
