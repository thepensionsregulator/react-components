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
	onSave?: (...args: any[]) => Promise<any>;
	complete?: boolean;
	addressAPI: any;
};

export const TrusteeContext = createContext<TrusteeContextProps>({
	current: {},
	send: (_, __) => ({}),
	onToggleCorrect: () => {},
	onCorrect: () => {},
	onRemove: () => {},
	onSave: () => new Promise((res) => res()),
	addressAPI: { get: () => new Promise((res) => res()) },
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
}

export type TrusteeProps = {
	complete: boolean;
	trustee: TrusteeInput;
	testId?: string;
	children?: RenderProps | ReactElement;
	onCorrect?: (...args: any[]) => void;
	onRemove?: (...args: any[]) => void;
	onSave?: (...args: any[]) => Promise<any>;
	addressAPI: any;
};

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
		actions: {
			save: onSave,
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
