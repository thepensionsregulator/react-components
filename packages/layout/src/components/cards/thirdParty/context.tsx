import React, { createContext, useContext } from 'react';
import { useMachine } from '@xstate/react';
import thirdPartyMachine from './thirdPartyMachine';
import { i18n as i18nDefaults } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import { ThirdPartyContextProps, ThirdPartyProviderProps } from '@tpr/core';

export const ThirdPartyContext = createContext<ThirdPartyContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: Promise.resolve,
	i18n: i18nDefaults,
});

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
