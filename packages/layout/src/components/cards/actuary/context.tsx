import React, { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';
import actuaryMachine, { ActuaryContext as IHAC } from './actuaryMachine';
import { State, EventData } from 'xstate';
import { i18n as i18nDefaults, ActuaryI18nProps } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import {
	RecursivePartial,
	CardDefaultProps,
	CardPersonalDetails,
	CardContactDetails,
	CardAddress,
	CardProviderProps,
} from '../common/interfaces';

export const ActuaryContext = createContext<ActuaryContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: Promise.resolve,
	onSaveContacts: Promise.resolve,
	onSaveName: Promise.resolve,
	i18n: i18nDefaults,
});

type RenderProps = (_props: ActuaryContextProps) => ReactElement;

export interface ActuaryContextProps
	extends Omit<ActuaryProviderProps, 'actuary'> {
	send: (
		event: any,
		payload?: EventData,
	) => Partial<State<IHAC, any, any, any>>;
	current: Partial<State<IHAC, any, any, any>>;
}

export interface Actuary
	extends CardDefaultProps,
		CardPersonalDetails,
		CardContactDetails {
	organisationName: string;
	address: Partial<CardAddress>;
}

export interface ActuaryProviderProps extends CardProviderProps {
	/** Actuary props from the API */
	actuary: Partial<Actuary>;
	children?: RenderProps | ReactElement;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<ActuaryI18nProps>;
}

export const ActuaryProvider = ({
	complete,
	actuary,
	children,
	i18n: i18nOverrides = {},
	...rest
}: ActuaryProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [current, send] = useMachine(actuaryMachine, {
		context: {
			complete,
			actuary: actuary,
		},
	});

	const ui =
		typeof children === 'function'
			? children({ current, send, i18n, ...rest })
			: children;
	return (
		<ActuaryContext.Provider value={{ current, send, i18n, ...rest }}>
			{ui}
		</ActuaryContext.Provider>
	);
};

export const useActuaryContext = (): ActuaryContextProps => {
	const actuaryUtils = useContext(ActuaryContext);
	if (!actuaryUtils) {
		throw new Error(
			`Actuary compound components cannot be rendered outside the ActuaryProvider component`,
		);
	}
	return actuaryUtils;
};
