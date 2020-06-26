import React, { createContext, useContext, ReactElement, useMemo } from 'react';
import { useMachine } from '@xstate/react';
import trusteeMachine, {
	TrusteeContext as TC,
	TrusteeProps,
} from './trusteeMachine';
import { State, EventData } from 'xstate';
import { SpaceProps } from '@tpr/core';
import { merge } from 'lodash';
import { i18n as i18nDefaults, i18nProps } from './i18n';

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
export interface TrusteeInput {
	schemeRoleId: string;
	//
	title: string;
	forename: string;
	surname: string;
	trusteeType: string;
	isProfessionalTrustee: boolean;
	//
	addressLine1: string;
	addressLine2: string;
	addressLine3: string;
	postTown: string;
	postcode: string;
	county: string;
	countryId: string;
	//
	telephoneNumber: string;
	emailAddress: string;
	[key: string]: any;
}

export type AddressAPIType = {
	/** API instance with auth to get a list of addresses */
	get: (endpoint: string) => Promise<any>;
	/** limit of items to display per search */
	limit: number;
};

export interface TrusteeContextProps {
	complete?: boolean;
	testId?: string;
	children?: RenderProps | ReactElement;
	cfg?: SpaceProps;
	i18n: Partial<i18nProps>;
	onRemove: (...args: any[]) => Promise<any>;
	onCorrect: (...args: any[]) => void;
	send: (event: any, payload?: EventData) => Partial<State<TC, any, any, any>>;
	addressAPI: AddressAPIType;
	current: Partial<State<TC, any, any, any>>;
}

export interface TrusteeCardProps {
	trustee: TrusteeInput;
	complete?: boolean;
	i18n?: Partial<i18nProps>;
	onCorrect: (...args: any[]) => void;
	onRemove: (...args: any[]) => Promise<any>;
	onDetailsSave: (values: any, trustee: TrusteeProps) => Promise<any>;
	onContactSave: (values: any, trustee: TrusteeProps) => Promise<any>;
	onAddressSave: (values: any, trustee: TrusteeProps) => Promise<any>;
	addressAPI: AddressAPIType;
	/** depending on your network lib, provide a path to the addressAPI results array */
	testId?: string;
	children?: RenderProps | ReactElement;
	cfg?: SpaceProps;
}

export const TrusteeProvider = ({
	trustee,
	complete,
	children,
	onDetailsSave,
	onContactSave,
	onAddressSave,
	i18n: i18nRewrites = {},
	...rest
}: TrusteeCardProps) => {
	const i18n = useMemo(() => merge(i18nDefaults, i18nRewrites), [
		i18nDefaults,
		i18nRewrites,
	]);
	const {
		addressLine1,
		addressLine2,
		addressLine3,
		postTown,
		postcode,
		county,
		countryId,
		...restTrustee
	} = trustee;

	const [current, send] = useMachine(trusteeMachine, {
		context: {
			complete,
			trustee: {
				...restTrustee,
				address: {
					addressLine1,
					addressLine2,
					addressLine3,
					postTown,
					postcode,
					county,
					countryId,
				},
			},
		},
		services: {
			onDetailsSave: ({ trustee }) => {
				const {
					schemeRoleId,
					title,
					forename,
					surname,
					trusteeType,
					isProfessionalTrustee,
				} = trustee;
				return onDetailsSave(
					{
						schemeRoleId,
						title,
						forename,
						surname,
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
