import React, { createContext, ReactElement, useContext } from 'react';
import { useMachine } from '@xstate/react';
import { State, EventData } from 'xstate';
import independentTrusteeMachine, {
	IndependentTrusteeContext as CGC,
} from './independentTrusteeMachine';
import { i18n as i18nDefaults, IndependentTrusteeI18nProps } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import {
	CardDefaultProps,
	CardAddress,
	RecursivePartial,
	CardProviderProps,
} from '../common/interfaces';

export interface IndependentTrustee extends CardDefaultProps {
	organisationName: string;
	address: Partial<CardAddress>;
	appointedByRegulator: boolean;
}

export interface IndependentTrusteeProviderProps extends CardProviderProps {
	/** IndependentTrustee props from the API */
	independentTrustee: Partial<IndependentTrustee>;
	children?: RenderProps | ReactElement;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<IndependentTrusteeI18nProps>;
	onSaveAppointed: (...args: any[]) => Promise<any>;
}

export interface IndependentTrusteeContextProps
	extends Omit<IndependentTrusteeProviderProps, 'independentTrustee'> {
	send: (event: any, payload?: EventData) => Partial<State<CGC, any, any, any>>;
	current: Partial<State<CGC, any, any, any>>;
}

type RenderProps = (_: IndependentTrusteeContextProps) => ReactElement;

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
	independentTrustee,
	children,
	i18n: i18nOverrides = {},
	...rest
}: IndependentTrusteeProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [current, send] = useMachine(independentTrusteeMachine, {
		context: {
			complete,
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
