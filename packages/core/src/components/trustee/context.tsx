import React, { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';
import trusteeMachine, { TrusteeContext as TC } from './trusteeMachine';
import { State, EventData } from 'xstate';

type TrusteeContextProps = {
	current: Partial<State<TC, any, any, any>>;
	send: (event: any, payload?: EventData) => Partial<State<TC, any, any, any>>;
	onToggleCorrect?: () => void;
	onCorrect?: (...args: any[]) => void;
	onRemove?: (...args: any[]) => void;
	onSave?: (...args: any[]) => void;
	api: any;
};

export const TrusteeContext = createContext<TrusteeContextProps>({
	current: {},
	send: (_, __) => ({}),
	onToggleCorrect: () => {},
	onCorrect: () => {},
	onRemove: () => {},
	onSave: () => {},
	api: { get: () => new Promise(res => res()) },
});

type RenderProps = (_: TrusteeContextProps) => ReactElement;

export interface TrusteeInput {
	complete: boolean;
	//
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
}

export type TrusteeProps = {
	trustee: Partial<TrusteeInput>;
	testId?: string;
	children?: RenderProps | ReactElement;
	onCorrect?: (...args: any[]) => void;
	onRemove?: (...args: any[]) => void;
	onSave?: (...args: any[]) => void;
	api: any;
};

export const TrusteeProvider = ({
	trustee,
	children,
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
	});

	const ui =
		typeof children === 'function'
			? children({ current, send, ...rest })
			: children;
	return (
		<TrusteeContext.Provider value={{ current, send, ...rest }}>
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
