import React, { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';
import insurerMachine, { InsurerContext as EC } from './insurerMachine';
import { State, EventData } from 'xstate';
import { SpaceProps } from '@tpr/core';
import { i18n as i18nDefaults, InsurerI18nProps } from './i18n';
import { useI18n } from '../hooks/use-i18n';

export const InsurerContext = createContext<InsurerContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: Promise.resolve,
	onSaveType: Promise.resolve,
	i18n: i18nDefaults,
});

type RenderProps = (_props: InsurerContextProps) => ReactElement;

export interface InsurerContextProps
	extends Omit<InsurerProviderProps, 'insurer'> {
	send: (event: any, payload?: EventData) => Partial<State<EC, any, any, any>>;
	current: Partial<State<EC, any, any, any>>;
}

export type RecursivePartial<T> = {
	[P in keyof T]?: RecursivePartial<T[P]>;
};

export type InsurerProps = {
	id: string;
	schemeRoleId: number;
	effectiveDate: string;
	organisationReference: number;
	organisationName: string;
	insurerCompanyReference: string;
	addressLine1: string;
	addressLine2: string;
	addressLine3: string;
	postTown: string;
	county: string;
	postcode: string;
	countryId: string;
	telephoneNumber: string;
	emailAddress: string;
	[key: string]: any;
};

export interface InsurerProviderProps {
	complete?: boolean;
	onCorrect?: (...args: any[]) => void;
	onRemove?: (...args: any[]) => Promise<any>;
	onSaveType?: (...args: any[]) => Promise<any>;
	testId?: string;
	/** insurer props from the API */
	insurer: Partial<InsurerProps>;
	children?: RenderProps | ReactElement;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<InsurerI18nProps>;
	/** cfg space props */
	cfg?: SpaceProps;
}

export const InsurerProvider = ({
	complete,
	insurer,
	children,
	i18n: i18nOverrides = {},
	...rest
}: InsurerProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [current, send] = useMachine(insurerMachine, {
		context: {
			complete,
			insurer,
		},
	});

	const ui =
		typeof children === 'function'
			? children({ current, send, i18n, ...rest })
			: children;
	return (
		<InsurerContext.Provider value={{ current, send, i18n, ...rest }}>
			{ui}
		</InsurerContext.Provider>
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
