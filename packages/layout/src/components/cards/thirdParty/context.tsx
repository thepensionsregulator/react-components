import React, { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';
import thirdPartyMachine, {
	ThirdPartyContext as EC,
} from './thirdPartyMachine';
import { State, EventData } from 'xstate';
import { i18n as i18nDefaults, ThirdPartyI18nProps } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import {
	CardDefaultProps,
	CardAddress,
	CardProviderProps,
	RecursivePartial,
} from '../common/interfaces';

export const ThirdPartyContext = createContext<ThirdPartyContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: Promise.resolve,
	i18n: i18nDefaults,
});

type RenderProps = (_props: ThirdPartyContextProps) => ReactElement;

export interface ThirdPartyContextProps
	extends Omit<ThirdPartyProviderProps, 'thirdParty'> {
	send: (event: any, payload?: EventData) => Partial<State<EC, any, any, any>>;
	current: Partial<State<EC, any, any, any>>;
}

export interface ThirdPartyProps extends CardDefaultProps {
	organisationName: string;
	address: Partial<CardAddress>;
}

export interface ThirdPartyProviderProps extends CardProviderProps {
	/** thirdParty props from the API */
	thirdParty: Partial<ThirdPartyProps>;
	children?: RenderProps | ReactElement;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<ThirdPartyI18nProps>;
}

export const ThirdPartyProvider = ({
	complete,
	preValidatedData,
	thirdParty,
	children,
	i18n: i18nOverrides = {},
	...rest
}: ThirdPartyProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [current, send] = useMachine(thirdPartyMachine, {
		context: {
			complete,
			preValidatedData,
			thirdParty,
		},
	});

	const fwdValues = { current, send, i18n, ...rest };
	const ui = typeof children === 'function' ? children(fwdValues) : children;
	return (
		<ThirdPartyContext.Provider value={fwdValues}>
			{ui}
		</ThirdPartyContext.Provider>
	);
};

export const useThirdPartyContext = (): ThirdPartyContextProps => {
	const thirdPartyUtils = useContext(ThirdPartyContext);
	if (!thirdPartyUtils) {
		throw new Error(
			`ThirdParty compound components cannot be rendered outside the ThirdPartyProvider component`,
		);
	}
	return thirdPartyUtils;
};
