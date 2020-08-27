import React, { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';
import actuaryMachine, { NewActuaryMachineContext as IHAC } from './newActuaryMachine';
import { State, EventData } from 'xstate';
import { i18n as i18nDefaults, NewActuaryI18nProps } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import { splitObjectIntoTwo } from '../../../utils';
import { 
  addressFields,
  RecursivePartial,
  CardDefaultProps,
  CardPersonalDetails,
  CardContactDetails,
  CardAddress,
  CardProviderProps
} from '../common/interfaces';

export const NewActuaryContext = createContext<NewActuaryContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: Promise.resolve,
	onSaveContacts: Promise.resolve,
	onSaveName: Promise.resolve,
	i18n: i18nDefaults,
});

type RenderProps = (_props: NewActuaryContextProps) => ReactElement;

export interface NewActuaryContextProps
	extends Omit<NewActuaryProviderProps, 'actuary'> {
	send: (
		event: any,
		payload?: EventData,
	) => Partial<State<IHAC, any, any, any>>;
	current: Partial<State<IHAC, any, any, any>>;
}

export interface NewActuary extends CardDefaultProps, CardPersonalDetails, CardContactDetails {
  countryId: string,
  organisationName: string,
  address: Partial<CardAddress>
}

export interface NewActuaryProviderProps extends CardProviderProps {
	/** Actuary props from the API */
	actuary: Partial<NewActuary>;
	children?: RenderProps | ReactElement;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<NewActuaryI18nProps>;
}

export const NewActuaryProvider = ({
	complete,
	actuary,
	children,
	i18n: i18nOverrides = {},
	...rest
}: NewActuaryProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [modifiedAdmin, adminAddress] = splitObjectIntoTwo(
		actuary,
		addressFields,
	);
	const [current, send] = useMachine(actuaryMachine, {
		context: {
			complete,
			actuary: {
				...modifiedAdmin,
				address: adminAddress,
			},
		},
	});

	const ui =
		typeof children === 'function'
			? children({ current, send, i18n, ...rest })
			: children;
	return (
		<NewActuaryContext.Provider value={{ current, send, i18n, ...rest }}>
			{ui}
		</NewActuaryContext.Provider>
	);
};

export const useNewActuaryContext = (): NewActuaryContextProps => {
	const actuaryUtils = useContext(NewActuaryContext);
	if (!actuaryUtils) {
		throw new Error(
			`Actuary compound components cannot be rendered outside the ActuaryProvider component`,
		);
	}
	return actuaryUtils;
};