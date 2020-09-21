import { EventData, State } from 'xstate';
import { Actuary, ActuaryProviderProps } from '../providers';

export interface ActuaryContext {
	complete: boolean;
	remove: { confirm: boolean; date: string } | null;
	actuary: Partial<Actuary>;
	preValidatedData?: boolean | null;
}

export interface ActuaryContextProps
	extends Omit<ActuaryProviderProps, 'actuary'> {
	send: (
		event: any,
		payload?: EventData,
	) => Partial<State<ActuaryContext, any, any, any>>;
	current: Partial<State<ActuaryContext, any, any, any>>;
}
