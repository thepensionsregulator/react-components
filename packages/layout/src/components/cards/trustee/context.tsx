import React, { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';
import trusteeMachine, {
	TrusteeContext as TC,
	TrusteeProps,
} from './trusteeMachine';
import { State, EventData } from 'xstate';
import { SpaceProps } from '@tpr/core';
import { i18n as i18nDefaults, TrusteeI18nProps } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import { splitObjectIntoTwo } from '../../../utils';
import {
	RecursivePartial,
	addressFields,
	AddressAPIType,
	CardDefaultProps,
	CardPersonalDetails,
	CardContactDetails,
	CardAddress,
} from '../common/interfaces';

export const TrusteeContext = createContext<TrusteeContextProps>({
	complete: false,
	testId: '',
	cfg: {},
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: () => new Promise((res) => res()),
	i18n: i18nDefaults,
	addressAPI: {
		get: (endpoint) => Promise.resolve(endpoint),
		limit: 50,
	},
});

type RenderProps = (_: TrusteeContextProps) => ReactElement;

export interface Trustee
	extends CardDefaultProps,
		CardPersonalDetails,
		CardContactDetails,
		CardAddress {
	trusteeType: string;
	isProfessionalTrustee: boolean;
	[key: string]: any;
}

export interface TrusteeContextProps {
	complete?: boolean;
	preValidatedData?: boolean;
	testId?: string | number;
	children?: RenderProps | ReactElement;
	cfg?: SpaceProps;
	i18n: RecursivePartial<TrusteeI18nProps>;
	onRemove: (...args: any[]) => Promise<any>;
	onCorrect: (...args: any[]) => void;
	send: (event: any, payload?: EventData) => Partial<State<TC, any, any, any>>;
	addressAPI: AddressAPIType;
	current: Partial<State<TC, any, any, any>>;
}

export interface TrusteeCardProps {
	trustee: Trustee;
	complete?: boolean;
	preValidatedData?: boolean;
	i18n?: RecursivePartial<TrusteeI18nProps>;
	onCorrect: (...args: any[]) => void;
	onRemove: (...args: any[]) => Promise<any>;
	onDetailsSave: (values: any, trustee: TrusteeProps) => Promise<any>;
	onContactSave: (values: any, trustee: TrusteeProps) => Promise<any>;
	onAddressSave: (values: any, trustee: TrusteeProps) => Promise<any>;
	addressAPI: AddressAPIType;
	/** depending on your network lib, provide a path to the addressAPI results array */
	testId?: string | number;
	children?: RenderProps | ReactElement;
	cfg?: SpaceProps;
}

export const TrusteeProvider = ({
	trustee,
	preValidatedData,
	complete,
	children,
	onDetailsSave,
	onContactSave,
	onAddressSave,
	i18n: i18nRewrites = {},
	...rest
}: TrusteeCardProps) => {
	const i18n = useI18n(i18nDefaults, i18nRewrites);
	const [modifiedTrustee, trusteeAddress] = splitObjectIntoTwo(
		trustee,
		addressFields,
	);

	const [current, send] = useMachine(trusteeMachine, {
		context: {
			complete,
			preValidatedData,
			trustee: {
				...modifiedTrustee,
				address: trusteeAddress,
			},
		},
		services: {
			onDetailsSave: ({ trustee }) => {
				const {
					schemeRoleId,
					title,
					firstName,
					lastName,
					trusteeType,
					isProfessionalTrustee,
				} = trustee;
				return onDetailsSave(
					{
						schemeRoleId,
						title,
						firstName,
						lastName,
						trusteeType,
						isProfessionalTrustee,
					},
					trustee,
				);
			},
			onContactSave: ({ trustee }) => {
				const { schemeRoleId, telephoneNumber, emailAddress } = trustee;
				return onContactSave(
					{ schemeRoleId, telephoneNumber, emailAddress },
					trustee,
				);
			},
			onAddressSave: ({ trustee }) => {
				const { schemeRoleId, address } = trustee;
				return onAddressSave({ schemeRoleId, ...address }, trustee);
			},
		},
	});

	const fwdValues = { current, send, i18n, ...rest };
	const ui = typeof children === 'function' ? children(fwdValues) : children;
	return (
		<TrusteeContext.Provider value={fwdValues}>{ui}</TrusteeContext.Provider>
	);
};

export const useTrusteeContext = (): TrusteeContextProps => {
	const trusteeUtils = useContext(TrusteeContext);
	if (!trusteeUtils) {
		throw new Error(
			`Trustee compound components cannot be rendered outside the TrusteeProvider component`,
		);
	}
	return trusteeUtils;
};
