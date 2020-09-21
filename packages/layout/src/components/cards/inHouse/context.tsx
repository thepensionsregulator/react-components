import React, { createContext, useContext } from 'react';
import { useMachine } from '@xstate/react';
import inHouseAdminMachine from './inHouseMachine';
import { i18n as i18nDefaults } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import { InHouseAdminContextProps, InHouseAdminProviderProps } from '@tpr/core';

export const InHouseAdminContext = createContext<InHouseAdminContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: Promise.resolve,
	onSaveContacts: Promise.resolve,
	onSaveAddress: Promise.resolve,
	onSaveName: Promise.resolve,
	i18n: i18nDefaults,
	addressAPI: {
		get: (endpoint) => Promise.resolve(endpoint),
		limit: 50,
	},
});

export const InHouseAdminProvider = ({
	complete,
	preValidatedData,
	inHouseAdmin,
	children,
	i18n: i18nOverrides = {},
	...rest
}: InHouseAdminProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [current, send] = useMachine(inHouseAdminMachine, {
		context: {
			complete,
			preValidatedData,
			inHouseAdmin,
		},
	});

	const fwdValues = { current, send, i18n, ...rest };
	const ui = typeof children === 'function' ? children(fwdValues) : children;
	return (
		<InHouseAdminContext.Provider value={fwdValues}>
			{ui}
		</InHouseAdminContext.Provider>
	);
};

export const useInHouseAdminContext = (): InHouseAdminContextProps => {
	const inHouseAdminUtils = useContext(InHouseAdminContext);
	if (!inHouseAdminUtils) {
		throw new Error(
			`InHouseAdmin compound components cannot be rendered outside the InHouseAdminProvider component`,
		);
	}
	return inHouseAdminUtils;
};
