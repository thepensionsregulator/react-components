import React, { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';
import inHouseAdminMachine, {
	InHouseAdminContext as IHAC,
} from './inHouseAdminMachine';
import { State, EventData } from 'xstate';
import { SpaceProps } from '@tpr/core';
import { i18n as i18nDefaults, InHouseAdminI18nProps } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import { splitObjectIntoTwo } from '../../../utils';

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

type AddressAPIType = {
	/** API instance with auth to get a list of addresses */
	get: (endpoint: string) => Promise<any>;
	/** limit of items to display per search */
	limit: number;
};

type RenderProps = (_props: InHouseAdminContextProps) => ReactElement;

export interface InHouseAdminContextProps
	extends Omit<InHouseAdminProviderProps, 'inHouseAdmin'> {
	send: (
		event: any,
		payload?: EventData,
	) => Partial<State<IHAC, any, any, any>>;
	current: Partial<State<IHAC, any, any, any>>;
}

export type RecursivePartial<T> = {
	[P in keyof T]?: RecursivePartial<T[P]>;
};

interface InHouseAdmin {
	id: string;
	schemeRoleId: string | number;
	title: string;
	firstname: string;
	lastname: string;
	effectiveDate: string;
	countryId: string;
	telephoneNumber: string;
	emailAddress: string;
	addressAPI: AddressAPIType;
}

export interface InHouseAdminWithContactsProps extends InHouseAdmin {
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

export interface InHouseAdminProps extends InHouseAdmin {
	addressLine1: string;
	addressLine2: string;
	addressLine3: string;
	postTown: string;
	county: string;
	postCode: string;
	country: string;
}

export interface InHouseAdminProviderProps {
	complete?: boolean;
	onCorrect?: (...args: any[]) => void;
	onRemove?: (...args: any[]) => Promise<any>;
	onSaveContacts?: (...args: any[]) => Promise<any>;
	onSaveAddress?: (...args: any[]) => Promise<any>;
	onSaveName?: (...args: any[]) => Promise<any>;
	testId?: string;
	/** inHouseAdmin props from the API */
	inHouseAdmin: Partial<InHouseAdminProps>;
	children?: RenderProps | ReactElement;
	addressAPI: AddressAPIType;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<InHouseAdminI18nProps>;
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

export const InHouseAdminProvider = ({
	complete,
	inHouseAdmin,
	children,
	i18n: i18nOverrides = {},
	...rest
}: InHouseAdminProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [modifiedAdmin, adminAddress] = splitObjectIntoTwo(
		inHouseAdmin,
		addressFields,
	);
	const [current, send] = useMachine(inHouseAdminMachine, {
		context: {
			complete,
			inHouseAdmin: {
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
		<InHouseAdminContext.Provider value={{ current, send, i18n, ...rest }}>
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
