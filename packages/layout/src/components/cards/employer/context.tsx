import React, { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';
import employerMachine, { EmployerContext as EC } from './employerMachine';
import { State, EventData } from 'xstate';
import { SpaceProps } from '@tpr/core';
import { i18n as i18nDefaults, EmployerI18nProps } from './i18n';
import { useI18n } from '../hooks/use-i18n';

export const EmployerContext = createContext<EmployerContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: Promise.resolve,
	onSaveType: Promise.resolve,
	i18n: i18nDefaults,
});

type RenderProps = (_: EmployerContextProps) => ReactElement;

export interface EmployerContextProps
	extends Omit<EmployerProviderProps, 'employer'> {
	send: (event: any, payload?: EventData) => Partial<State<EC, any, any, any>>;
	current: Partial<State<EC, any, any, any>>;
}

export type RecursivePartial<T> = {
	[P in keyof T]?: RecursivePartial<T[P]>;
};

export interface EmployerProviderProps {
	complete?: boolean;
	onCorrect?: (...args: any[]) => void;
	onRemove?: (...args: any[]) => Promise<any>;
	onSaveType?: (...args: any[]) => Promise<any>;
	testId?: string;
	employer: Partial<EmployerProps>;
	children?: RenderProps | ReactElement;
	i18n?: RecursivePartial<EmployerI18nProps>;
	cfg?: SpaceProps;
}

export type EmployerProps = {
	schemeRoleId: string | number;
	employerType:
		| 'participating-employer'
		| 'principal-employer'
		| 'principal-and-participating';
	organisationReference: number;
	organisationName: string;
	companiesHouseNumber: number | string;
	registeredCharityNumber: number | string;
	addressLine1: string;
	addressLine2: string;
	addressLine3: string;
	postTown: string;
	county: string;
	postCode: string;
	countryId: string;
	effectiveDate: string;
};

export const EmployerProvider = ({
	complete,
	employer,
	children,
	i18n: i18nOverrides = {},
	...rest
}: EmployerProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [current, send] = useMachine(employerMachine, {
		context: {
			complete,
			employer,
		},
	});

	const ui =
		typeof children === 'function'
			? children({ current, send, i18n, ...rest })
			: children;
	return (
		<EmployerContext.Provider value={{ current, send, i18n, ...rest }}>
			{ui}
		</EmployerContext.Provider>
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
