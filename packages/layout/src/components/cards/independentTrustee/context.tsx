import React, { createContext, useContext } from 'react';
import { useMachine } from '@xstate/react';
import independentTrusteeMachine from './independentTrusteeMachine';
import { i18n as i18nDefaults } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import {
	IndependentTrusteeContextProps,
	IndependentTrusteeProviderProps,
} from '@tpr/core';

export const IndependentTrusteeContext = createContext<
	IndependentTrusteeContextProps
>({
	current: {},
	send: (_, __) => ({}),
	i18n: i18nDefaults,
	onCorrect: () => {},
	onRemove: Promise.resolve,
	onSaveAppointed: Promise.resolve,
});

export const IndependentTrusteeProvider = ({
	complete,
	preValidatedData,
	independentTrustee,
	children,
	i18n: i18nOverrides = {},
	...rest
}: IndependentTrusteeProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [current, send] = useMachine(independentTrusteeMachine, {
		context: {
			complete,
			preValidatedData,
			independentTrustee,
		},
	});

	const fwdValues = { current, send, i18n, ...rest };
	const ui = typeof children === 'function' ? children(fwdValues) : children;
	return (
		<IndependentTrusteeContext.Provider value={fwdValues}>
			{ui}
		</IndependentTrusteeContext.Provider>
	);
};

export const useIndependentTrusteeContext = (): IndependentTrusteeContextProps => {
	const independentTrusteeUtils = useContext(IndependentTrusteeContext);
	if (!independentTrusteeUtils) {
		throw new Error(
			`Corporate Group compound components cannot be rendered outside the ComporateGroupProvider component`,
		);
	}
	return independentTrusteeUtils;
};
