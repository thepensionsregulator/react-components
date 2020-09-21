import React, { createContext, useContext } from 'react';
import { useMachine } from '@xstate/react';
import insurerMachine from './insurerMachine';
import { i18n as i18nDefaults } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import { InsurerContextProps, InsurerProviderProps } from '@tpr/core';

export const InsurerContext = createContext<InsurerContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: Promise.resolve,
	onSaveRef: Promise.resolve,
	i18n: i18nDefaults,
});

export const InsurerProvider = ({
	complete,
	preValidatedData,
	insurer,
	children,
	i18n: i18nOverrides = {},
	...rest
}: InsurerProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [current, send] = useMachine(insurerMachine, {
		context: {
			complete,
			preValidatedData,
			insurer,
		},
	});

	const fwdValues = { current, send, i18n, ...rest };
	const ui = typeof children === 'function' ? children(fwdValues) : children;
	return (
		<InsurerContext.Provider value={fwdValues}>{ui}</InsurerContext.Provider>
	);
};

export const useInsurerContext = (): InsurerContextProps => {
	const insurerUtils = useContext(InsurerContext);
	if (!insurerUtils) {
		throw new Error(
			`Insurer compound components cannot be rendered outside the InsurerProvider component`,
		);
	}
	return insurerUtils;
};
