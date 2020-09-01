import React, { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';
import insurerMachine, { InsurerContext as EC } from './insurerMachine';
import { State, EventData } from 'xstate';
import { i18n as i18nDefaults, InsurerI18nProps } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import {
	CardDefaultProps,
	CardContactDetails,
	CardAddress,
	CardProviderProps,
	RecursivePartial,
} from '../common/interfaces';

export const InsurerContext = createContext<InsurerContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: Promise.resolve,
	onSaveRef: Promise.resolve,
	i18n: i18nDefaults,
});

type RenderProps = (_props: InsurerContextProps) => ReactElement;

export interface InsurerContextProps
	extends Omit<InsurerProviderProps, 'insurer'> {
	send: (event: any, payload?: EventData) => Partial<State<EC, any, any, any>>;
	current: Partial<State<EC, any, any, any>>;
}

export interface Insurer extends CardDefaultProps, CardContactDetails {
	organisationReference: number;
	organisationName: string;
	insurerCompanyReference: string;
	address: Partial<CardAddress>;
	//[key: string]: any;
}

export interface InsurerProviderProps extends CardProviderProps {
	onSaveRef?: (...args: any[]) => Promise<any>;
	/** insurer props from the API */
	insurer: Partial<Insurer>;
	children?: RenderProps | ReactElement;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<InsurerI18nProps>;
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
