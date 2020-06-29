import React, { createContext, useContext, ReactElement, useMemo } from 'react';
import { useMachine } from '@xstate/react';
import employerMachine, { EmployerContext as EC } from './employerMachine';
import { State, EventData } from 'xstate';
import { SpaceProps } from '@tpr/core';
import { i18n as i18nDefaults, i18nProps } from './i18n';
import { merge } from 'lodash';

export const EmployerContext = createContext<EmployerContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: Promise.resolve,
	onSave: Promise.resolve,
	i18n: i18nDefaults,
});

type RenderProps = (_: EmployerContextProps) => ReactElement;

export interface EmployerContextProps
	extends Omit<EmployerProviderProps, 'employer'> {
	send: (event: any, payload?: EventData) => Partial<State<EC, any, any, any>>;
	current: Partial<State<EC, any, any, any>>;
}

export interface EmployerProviderProps {
	complete?: boolean;
	onCorrect?: (...args: any[]) => void;
	onRemove?: (...args: any[]) => Promise<any>;
	onSave?: (...args: any[]) => Promise<any>;
	testId?: string;
	employer: Partial<EmployerProps>;
	children?: RenderProps | ReactElement;
	i18n?: i18nProps;
	cfg?: SpaceProps;
}

export type EmployerProps = {
	schemeRoleId: number;
	employerType:
		| 'participating-employer'
		| 'principal-employer'
		| 'principal-and-participating';
	organisationReference: number;
	organisationName: string;
	companiesHouseNumber: number;
	registeredCharityNumber: number;
	addressLine1: string;
	addressLine2: string;
	addressLine3: string;
	postTown: string;
	county: string;
	postCode: string;
	countryId: string;
};

export const EmployerProvider = ({
	complete,
	employer,
	children,
	onSave,
	i18n: i18nOverrides = {},
	...rest
}: EmployerProviderProps) => {
	const i18n = useMemo(() => merge(i18nDefaults, i18nOverrides), [
		i18nDefaults,
		i18nOverrides,
	]);
	const [current, send] = useMachine(employerMachine, {
		context: {
			complete,
			employer,
		},
		services: {
			saveData: ({ employer }) => onSave(employer),
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
