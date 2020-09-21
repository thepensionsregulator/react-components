import { EventData, State } from 'xstate';
import { ThirdPartyProps, ThirdPartyProviderProps } from '../providers';

export interface ThirdPartyContext {
	complete: boolean;
	remove: { confirm: boolean; date: string } | null;
	thirdParty: Partial<ThirdPartyProps>;
	preValidatedData?: boolean | null;
}

export interface ThirdPartyContextProps
	extends Omit<ThirdPartyProviderProps, 'thirdParty'> {
	send: (
		event: any,
		payload?: EventData,
	) => Partial<State<ThirdPartyContext, any, any, any>>;
	current: Partial<State<ThirdPartyContext, any, any, any>>;
}
