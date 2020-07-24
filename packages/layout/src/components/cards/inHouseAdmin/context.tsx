import React, { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';
import inHouseAdminMachine, {
	InHouseAdminContext as IHAC,
} from './inHouseAdminMachine';
import { State, EventData } from 'xstate';
import { SpaceProps } from '@tpr/core';
import { i18n as i18nDefaults, InHouseAdminI18nProps } from './i18n';
import { useI18n } from '../hooks/use-i18n';

export const InHouseAdminContext = createContext<InHouseAdminContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: Promise.resolve,
	onSaveType: Promise.resolve,
	i18n: i18nDefaults,
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

export type RecursivePartial<T> = {
	[P in keyof T]?: RecursivePartial<T[P]>;
};

export type InHouseAdminProps = {
	id: string;
	schemeRoleId: string;
	title: string;
	firstname: string;
	lastname: string;
	effectiveDate: string;
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

export interface InHouseAdminProviderProps {
	complete?: boolean;
	onCorrect?: (...args: any[]) => void;
	onRemove?: (...args: any[]) => Promise<any>;
	onSaveType?: (...args: any[]) => Promise<any>;
	testId?: string;
	/** inHouseAdmin props from the API */
	inHouseAdmin: Partial<InHouseAdminProps>;
	children?: RenderProps | ReactElement;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<InHouseAdminI18nProps>;
	/** cfg space props */
	cfg?: SpaceProps;
}

export const InHouseAdminProvider = ({
	complete,
	inHouseAdmin,
	children,
	i18n: i18nOverrides = {},
	...rest
}: InHouseAdminProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [current, send] = useMachine(inHouseAdminMachine, {
		context: {
			complete,
			inHouseAdmin,
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
