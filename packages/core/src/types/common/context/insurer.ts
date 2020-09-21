import { EventData, State } from 'xstate';
import { Insurer, InsurerProviderProps } from '../providers';

export interface InsurerContext {
	complete: boolean;
	remove: { confirm: boolean; date: string } | null;
	insurer: Partial<Insurer>;
	preValidatedData?: boolean | null;
}

export interface InsurerContextProps
	extends Omit<InsurerProviderProps, 'insurer'> {
	send: (
		event: any,
		payload?: EventData,
	) => Partial<State<InsurerContext, any, any, any>>;
	current: Partial<State<InsurerContext, any, any, any>>;
}
