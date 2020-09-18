import React, { createContext, useContext } from 'react';
import { useMachine } from '@xstate/react';
import actuaryMachine from './actuaryMachine';
import { i18n as i18nDefaults } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import {
	ActuaryContextProps,
	ActuaryProviderProps
} from '@tpr/core';

export const ActuaryContext = createContext<ActuaryContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: Promise.resolve,
	onSaveContacts: Promise.resolve,
	onSaveName: Promise.resolve,
	i18n: i18nDefaults,
});

export const ActuaryProvider = ({
	complete,
	preValidatedData,
	actuary,
	children,
	i18n: i18nOverrides = {},
	...rest
}: ActuaryProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [current, send] = useMachine(actuaryMachine, {
		context: {
			complete,
			preValidatedData,
			actuary,
		},
	});

	const fwdValues = { current, send, i18n, ...rest };
	const ui = typeof children === 'function' ? children(fwdValues) : children;
	return (
		<ActuaryContext.Provider value={fwdValues}>{ui}</ActuaryContext.Provider>
	);
};

export const useActuaryContext = (): ActuaryContextProps => {
	const actuaryUtils = useContext(ActuaryContext);
	if (!actuaryUtils) {
		throw new Error(
			`Actuary compound components cannot be rendered outside the ActuaryProvider component`,
		);
	}
	return actuaryUtils;
};
