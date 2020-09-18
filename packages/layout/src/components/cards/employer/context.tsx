import React, { createContext, useContext } from 'react';
import { useMachine } from '@xstate/react';
import employerMachine from './employerMachine';
import { i18n as i18nDefaults } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import { EmployerProviderProps, EmployerContextProps } from '@tpr/core';

export const EmployerContext = createContext<EmployerContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: Promise.resolve,
	onSaveType: Promise.resolve,
	i18n: i18nDefaults,
});

export const EmployerProvider = ({
	complete,
	preValidatedData,
	employer,
	children,
	i18n: i18nOverrides = {},
	...rest
}: EmployerProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [current, send] = useMachine(employerMachine, {
		context: {
			complete,
			preValidatedData,
			employer,
		},
	});

	const fwdValues = { current, send, i18n, ...rest };
	const ui = typeof children === 'function' ? children(fwdValues) : children;
	return (
		<EmployerContext.Provider value={fwdValues}>{ui}</EmployerContext.Provider>
	);
};

export const useEmployerContext = (): EmployerContextProps => {
	const employerUtils = useContext(EmployerContext);
	if (!employerUtils) {
		throw new Error(
			`Employer compound components cannot be rendered outside the EmployerProvider component`,
		);
	}
	return employerUtils;
};
