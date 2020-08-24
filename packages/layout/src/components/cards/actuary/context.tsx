import React, { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';
import actuaryMachine, { ActuaryContext as IHAC } from './actuaryMachine';
import { State, EventData } from 'xstate';
import { SpaceProps } from '@tpr/core';
import { i18n as i18nDefaults, ActuaryI18nProps } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import { splitObjectIntoTwo } from '../../../utils';

export const ActuaryContext = createContext<ActuaryContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: Promise.resolve,
	onSaveContacts: Promise.resolve,
	//onSaveAddress: Promise.resolve,
	onSaveName: Promise.resolve,
	i18n: i18nDefaults,
	// addressAPI: {
	// 	get: (endpoint) => Promise.resolve(endpoint),
	// 	limit: 50,
	// },
});

//type AddressAPIType = {
/** API instance with auth to get a list of addresses */
//	get: (endpoint: string) => Promise<any>;
/** limit of items to display per search */
//	limit: number;
//};

type RenderProps = (_props: ActuaryContextProps) => ReactElement;

export interface ActuaryContextProps
	extends Omit<ActuaryProviderProps, 'actuary'> {
	send: (
		event: any,
		payload?: EventData,
	) => Partial<State<IHAC, any, any, any>>;
	current: Partial<State<IHAC, any, any, any>>;
}

export type RecursivePartial<T> = {
	[P in keyof T]?: RecursivePartial<T[P]>;
};

interface Actuary {
	//id: string;
	schemeRoleId: string | number;
	title: string;
	firstname: string;
	lastname: string;
	effectiveDate: string;
	countryId: string;
	telephoneNumber: string;
	emailAddress: string;
	//addressAPI: AddressAPIType;
	organisationName: string;
}

export interface ActuaryWithContactsProps extends Actuary {
	address: Partial<{
		addressLine1: string;
		addressLine2: string;
		addressLine3: string;
		postTown: string;
		county: string;
		postCode: string;
		country: string;
	}>;
}

export interface ActuaryProps extends Actuary {
	addressLine1: string;
	addressLine2: string;
	addressLine3: string;
	postTown: string;
	county: string;
	postCode: string;
	country: string;
}

export interface ActuaryProviderProps {
	complete?: boolean;
	onCorrect?: (...args: any[]) => void;
	onRemove?: (...args: any[]) => Promise<any>;
	onSaveContacts?: (...args: any[]) => Promise<any>;
	//onSaveAddress?: (...args: any[]) => Promise<any>;
	onSaveName?: (...args: any[]) => Promise<any>;
	testId?: string;
	/** Actuary props from the API */
	actuary: Partial<ActuaryProps>;
	children?: RenderProps | ReactElement;
	//addressAPI: AddressAPIType;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<ActuaryI18nProps>;
	/** cfg space props */
	cfg?: SpaceProps;
}

const addressFields = [
	'addressLine1',
	'addressLine2',
	'addressLine3',
	'postTown',
	'county',
	'country',
	'postCode',
	'countryId',
];

export const ActuaryProvider = ({
	complete,
	actuary,
	children,
	i18n: i18nOverrides = {},
	...rest
}: ActuaryProviderProps) => {
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
