import React, { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';
import trusteeMachine, { TrusteeContext as TC } from './trusteeMachine';
import { State, EventData } from 'xstate';

type TrusteeContextProps = {
	current: Partial<State<TC, any, any, any>>;
	send: (event: any, payload?: EventData) => Partial<State<TC, any, any, any>>;
};

export const TrusteeContext = createContext<TrusteeContextProps>({
	current: {},
	send: (_, __) => ({}),
});

type RenderProps = (_: TrusteeContextProps) => ReactElement;
export type TrusteeProps = { trustee: Partial<TC>; children?: RenderProps | ReactElement };

export const TrusteeProvider = ({ trustee, children }: TrusteeProps) => {
	const [current, send] = useMachine(trusteeMachine, {
		context: trustee,
	});

	const ui = typeof children === 'function' ? children({ current, send }) : children;
	return <TrusteeContext.Provider value={{ current, send }}>{ui}</TrusteeContext.Provider>;
};

export const useTrusteeContext = (): TrusteeContextProps => {
	const trusteeUtils = useContext(TrusteeContext);
	if (!trusteeUtils) {
		throw new Error(`Trustee compound components cannot be rendered outside the TrusteeProvider component`);
	}
	return trusteeUtils;
};
