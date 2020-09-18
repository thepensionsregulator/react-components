import React, { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';
import inHouseAdminMachine, {
	InHouseAdminContext as IHAC,
} from './inHouseMachine';
import { State, EventData } from 'xstate';
import { i18n as i18nDefaults, InHouseAdminI18nProps } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import {
	RecursivePartial,
	CardDefaultProps,
	CardPersonalDetails,
	CardContactDetails,
	CardAddress,
	CardProviderProps,
	AddressAPIType,
} from '../common/interfaces';

export const InHouseAdminContext = createContext<InHouseAdminContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: Promise.resolve,
	onSaveContacts: Promise.resolve,
	onSaveAddress: Promise.resolve,
	onSaveName: Promise.resolve,
	i18n: i18nDefaults,
	addressAPI: {
		get: (endpoint) => Promise.resolve(endpoint),
		limit: 50,
	},
});

type RenderProps = (_props: InHouseAdminContextProps) => ReactElement;

export interface InHouseAdminContextProps
	extends Omit<InHouseAdminProviderProps, 'inHouseAdmin'> {
	send: (
		event: any,
		payload?: EventData,
	) => Partial<State<IHAC, any, any, any>>;
	current: Partial<State<IHAC, any, any, any>>;
}

export interface InHouseAdmin
	extends CardDefaultProps,
		CardPersonalDetails,
		CardContactDetails {
	addressAPI: AddressAPIType;
	address: Partial<CardAddress>;
}

export interface InHouseAdminNoApi extends Omit<InHouseAdmin, 'addressAPI'> {}

export interface InHouseAdminProviderProps extends CardProviderProps {
	/** inHouseAdmin props from the API */
	inHouseAdmin: Partial<InHouseAdmin>;
	children?: RenderProps | ReactElement;
	addressAPI: AddressAPIType;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<InHouseAdminI18nProps>;
}

export const InHouseAdminProvider = ({
	complete,
	preValidatedData,
	inHouseAdmin,
	children,
	i18n: i18nOverrides = {},
	...rest
}: InHouseAdminProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [current, send] = useMachine(inHouseAdminMachine, {
		context: {
			complete,
			preValidatedData,
			inHouseAdmin,
		},
	});

	const fwdValues = { current, send, i18n, ...rest };
	const ui = typeof children === 'function' ? children(fwdValues) : children;
	return (
		<InHouseAdminContext.Provider value={fwdValues}>
			{ui}
		</InHouseAdminContext.Provider>
	);
};

export const useInHouseAdminContext = (): InHouseAdminContextProps => {
	const inHouseAdminUtils = useContext(InHouseAdminContext);
	if (!inHouseAdminUtils) {
		throw new Error(
			`InHouseAdmin compound components cannot be rendered outside the InHouseAdminProvider component`,
		);
	}
	return inHouseAdminUtils;
};
