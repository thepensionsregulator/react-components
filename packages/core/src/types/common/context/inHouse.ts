import { EventData, State } from 'xstate';
import { InHouseAdmin, InHouseAdminProviderProps } from '../providers';

export interface InHouseAdminContext {
	complete: boolean;
	remove: { confirm: boolean; date: string } | null;
	inHouseAdmin: Partial<InHouseAdmin>;
	preValidatedData?: boolean | null;
}

export interface InHouseAdminContextProps
	extends Omit<InHouseAdminProviderProps, 'inHouseAdmin'> {
	send: (
		event: any,
		payload?: EventData,
	) => Partial<State<InHouseAdminContext, any, any, any>>;
	current: Partial<State<InHouseAdminContext, any, any, any>>;
}
