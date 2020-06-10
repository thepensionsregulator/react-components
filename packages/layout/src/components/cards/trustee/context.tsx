import React, { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';
import trusteeMachine, { TrusteeContext as TC } from './trusteeMachine';
import { State, EventData } from 'xstate';
import { SpaceProps } from '@tpr/core';

export const TrusteeContext = createContext<TrusteeContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: () => new Promise((res) => res()),
	onSave: () => new Promise((res) => res()),
	addressAPI: { get: () => new Promise((res) => res()) },
});

type RenderProps = (_: TrusteeContextProps) => ReactElement;
export interface TrusteeInput {
	id: string;
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

export interface TrusteeContextProps extends Omit<TrusteeProps, 'trustee'> {
	send: (event: any, payload?: EventData) => Partial<State<TC, any, any, any>>;
	current: Partial<State<TC, any, any, any>>;
}

export interface TrusteeProps {
	complete?: boolean;
	onCorrect?: (...args: any[]) => void;
	onRemove?: (...args: any[]) => Promise<any>;
	onSave?: (trustee: Partial<TrusteeInput>) => Promise<any>;
	addressAPI: any;
	testId?: string;
	trustee: TrusteeInput;
	children?: RenderProps | ReactElement;
	cfg?: SpaceProps;
}

export const TrusteeProvider = ({
	trustee,
	complete,
	children,
	onSave,
	...rest
}: TrusteeProps) => {
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
			saveData: ({ trustee }, _) => {
				const { address, ...details } = trustee;
				return onSave({ ...details, ...address });
			},
		},
	});

	const ui =
		typeof children === 'function'
			? children({ current, send, onSave, ...rest })
			: children;
	return (
		<TrusteeContext.Provider value={{ current, send, onSave, ...rest }}>
			{ui}
		</TrusteeContext.Provider>
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
