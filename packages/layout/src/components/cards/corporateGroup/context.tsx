import React, { createContext, ReactElement, useContext } from 'react';
import { useMachine } from '@xstate/react';
import { State, EventData } from 'xstate';
import corporateGroupMachine, {
	CorporateGroupContext as CGC,
} from './corporateGroupMachine';
import { i18n as i18nDefaults, CorporateGroupI18nProps } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import {
	CardDefaultProps,
	CardPersonalDetails,
	CardContactDetails,
	CardAddress,
	RecursivePartial,
	CardProviderProps,
} from '../common/interfaces';

export interface CorporateGroup
	extends CardDefaultProps,
		CardPersonalDetails,
		CardContactDetails {
	organisationName: string;
	address: Partial<CardAddress>;
	directorIsProfessional: boolean;
}

export interface CorporateGroupProviderProps extends CardProviderProps {
	/** Actuary props from the API */
	corporateGroup: Partial<CorporateGroup>;
	children?: RenderProps | ReactElement;
	/** overwrite any text that you need */
	i18n?: RecursivePartial<CorporateGroupI18nProps>;
	onSaveDirector: (directorIsProfessional: boolean) => Promise<any>;
}

export interface CorporateGroupContextProps
	extends Omit<CorporateGroupProviderProps, 'corporateGroup'> {
	send: (event: any, payload?: EventData) => Partial<State<CGC, any, any, any>>;
	current: Partial<State<CGC, any, any, any>>;
}

type RenderProps = (_: CorporateGroupContextProps) => ReactElement;

export const CorporateGroupContext = createContext<CorporateGroupContextProps>({
	current: {},
	send: (_, __) => ({}),
	i18n: i18nDefaults,
	onCorrect: () => {},
	onRemove: Promise.resolve,
	onSaveName: Promise.resolve,
	onSaveContacts: Promise.resolve,
	onSaveDirector: Promise.resolve,
});

export const CorporateGroupProvider = ({
	complete,
	corporateGroup,
	children,
	i18n: i18nOverrides = {},
	...rest
}: CorporateGroupProviderProps) => {
	const i18n = useI18n(i18nDefaults, i18nOverrides);
	const [current, send] = useMachine(corporateGroupMachine, {
		context: {
			complete,
			corporateGroup,
		},
	});

	const fwdValues = { current, send, i18n, ...rest };
	const ui = typeof children === 'function' ? children(fwdValues) : children;
	return (
		<CorporateGroupContext.Provider value={fwdValues}>
			{ui}
		</CorporateGroupContext.Provider>
	);
};

export const useCorporateGroupContext = (): CorporateGroupContextProps => {
	const corporateGroupUtils = useContext(CorporateGroupContext);
	if (!corporateGroupUtils) {
		throw new Error(
			`Corporate Group compound components cannot be rendered outside the ComporateGroupProvider component`,
		);
	}
	return corporateGroupUtils;
};
