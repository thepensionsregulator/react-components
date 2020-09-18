import React, { createContext, useContext } from 'react';
import { useMachine } from '@xstate/react';
import trusteeMachine from './trusteeMachine';
import { i18n as i18nDefaults } from './i18n';
import { useI18n } from '../hooks/use-i18n';
import { splitObjectIntoTwo } from '../../../utils';
import {
	addressFields,
	TrusteeContextProps,
	TrusteeCardProps
} from '@tpr/core';

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
					firstname,
					lastname,
					trusteeType,
					isProfessionalTrustee,
				} = trustee;
				return onDetailsSave(
					{
						schemeRoleId,
						title,
						firstname,
						lastname,
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
