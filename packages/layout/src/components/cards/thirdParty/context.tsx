import React, { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';
import thirdPartyMachine, {
	ThirdPartyContext as EC,
} from './thirdPartyMachine';
import { State, EventData } from 'xstate';
import { SpaceProps } from '@tpr/core';
import { i18n as i18nDefaults, ThirdPartyI18nProps } from './i18n';
import { useI18n } from '../hooks/use-i18n';

export const ThirdPartyContext = createContext<ThirdPartyContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: Promise.resolve,
	i18n: i18nDefaults,
});

type RenderProps = (_props: ThirdPartyContextProps) => ReactElement;

export interface ThirdPartyContextProps
	extends Omit<ThirdPartyProviderProps, 'thirdParty'> {
	send: (event: any, payload?: EventData) => Partial<State<EC, any, any, any>>;
	current: Partial<State<EC, any, any, any>>;
}

export type RecursivePartial<T> = {
	[P in keyof T]?: RecursivePartial<T[P]>;
};

export type ThirdPartyProps = {
	id: string;
	schemeRoleId: number;
	effectiveDate: string;
	organisationName: string;
	telephoneNumber: string;
	emailAddress: string;
	addressLine1: string;
	addressLine2: string;
	addressLine3: string;
	postTown: string;
	county: string;
	postcode: string;
	countryId: string;
	[key: string]: any;
};

export interface ThirdPartyProviderProps {
	complete?: boolean;
	onCorrect?: (...args: any[]) => void;
	onRemove?: (...args: any[]) => Promise<any>;
	testId?: string;
	/** thirdParty props from the API */
	thirdParty: Partial<ThirdPartyProps>;
	children?: RenderProps | ReactElement;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<ThirdPartyI18nProps>;
	/** cfg space props */
	cfg?: SpaceProps;
}

export const ThirdPartyProvider = ({
	complete,
	thirdParty,
	children,
	i18n: i18nOverrides = {},
	...rest
}: ThirdPartyProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [current, send] = useMachine(thirdPartyMachine, {
		context: {
			complete,
			thirdParty,
		},
	});

	const ui =
		typeof children === 'function'
			? children({ current, send, i18n, ...rest })
			: children;
	return (
		<ThirdPartyContext.Provider value={{ current, send, i18n, ...rest }}>
			{ui}
		</ThirdPartyContext.Provider>
	);
};

export const useThirdPartyContext = (): ThirdPartyContextProps => {
	const thirdPartyUtils = useContext(ThirdPartyContext);
	if (!thirdPartyUtils) {
		throw new Error(
			`ThirdParty compound components cannot be rendered outside the ThirdPartyProvider component`,
		);
	}
	return thirdPartyUtils;
};
