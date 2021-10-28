import React, { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';
import employerMachine, { EmployerContext as EC } from './employerMachine';
import { State, EventData } from 'xstate';
import { i18n as i18nDefaults, EmployerI18nProps } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import {
	CardDefaultProps,
	CardAddress,
	CardProviderProps,
	RecursivePartial,
} from '../common/interfaces';

export const EmployerContext = createContext<EmployerContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: Promise.resolve,
	onSaveType: Promise.resolve,
	showStatutoryEmployerSection: true,
	i18n: i18nDefaults,
});

type RenderProps = (_: EmployerContextProps) => ReactElement;

export interface EmployerContextProps
	extends Omit<EmployerProviderProps, 'employer'> {
	send: (event: any, payload?: EventData) => Partial<State<EC, any, any, any>>;
	current: Partial<State<EC, any, any, any>>;
}

export interface EmployerProviderProps extends CardProviderProps {
	onSaveType?: (...args: any[]) => Promise<any>;
	/** employer props from the API */
	employer: Partial<Employer>;
	showStatutoryEmployerSection?: boolean;
	children?: RenderProps | ReactElement;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<EmployerI18nProps>;
}

export interface Employer extends CardDefaultProps {
	employerType:
		| 'participating-employer'
		| 'principal-employer'
		| 'principal-and-participating';
	organisationReference: number;
	organisationName: string;
	registeredCharityNumber: number | string;
	epsrNumber: number | string;
	statutoryEmployer: 'statutory' | 'non-statutory';
	address: Partial<CardAddress>;
}

export const EmployerProvider = ({
	complete,
	preValidatedData = null,
	employer,
	showStatutoryEmployerSection,
	lastBtnClicked = null,
	children,
	i18n: i18nOverrides = {},
	...rest
}: EmployerProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [current, send] = useMachine(employerMachine, {
		context: {
			complete,
			showStatutoryEmployerSection,
			preValidatedData,
			employer,
			lastBtnClicked,
		},
	});

	const fwdValues = {
		current,
		send,
		showStatutoryEmployerSection,
		i18n,
		...rest,
	};
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
