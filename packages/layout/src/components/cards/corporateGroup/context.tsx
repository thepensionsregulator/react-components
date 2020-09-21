import React, { createContext, useContext } from 'react';
import { useMachine } from '@xstate/react';
import corporateGroupMachine from './corporateGroupMachine';
import { i18n as i18nDefaults } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import {
	CorporateGroupContextProps,
	CorporateGroupProviderProps,
} from '@tpr/core';

export const CorporateGroupContext = createContext<CorporateGroupContextProps>({
	current: {},
	send: (_, __) => ({}),
	i18n: i18nDefaults,
	onCorrect: () => {},
	onRemove: Promise.resolve,
	onSaveName: Promise.resolve,
	onSaveContacts: Promise.resolve,
	onSaveDirector: Promise.resolve,
});

export const CorporateGroupProvider = ({
	complete,
	preValidatedData,
	corporateGroup,
	children,
	i18n: i18nOverrides = {},
	...rest
}: CorporateGroupProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [current, send] = useMachine(corporateGroupMachine, {
		context: {
			complete,
			preValidatedData,
			corporateGroup,
		},
	});

	const fwdValues = { current, send, i18n, ...rest };
	const ui = typeof children === 'function' ? children(fwdValues) : children;
	return (
		<CorporateGroupContext.Provider value={fwdValues}>
			{ui}
		</CorporateGroupContext.Provider>
	);
};

export const useCorporateGroupContext = (): CorporateGroupContextProps => {
	const corporateGroupUtils = useContext(CorporateGroupContext);
	if (!corporateGroupUtils) {
		throw new Error(
			`Corporate Group compound components cannot be rendered outside the ComporateGroupProvider component`,
		);
	}
	return corporateGroupUtils;
};
