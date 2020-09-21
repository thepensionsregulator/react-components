import { EventData, State } from 'xstate';
import { RemoveReasonProps } from '../interfaces';
import { CorporateGroup, CorporateGroupProviderProps } from '../providers';

export interface CorporateGroupContext {
	complete: boolean;
	remove?: RemoveReasonProps;
	corporateGroup: Partial<CorporateGroup>;
	preValidatedData?: boolean | null;
}

export interface CorporateGroupContextProps
	extends Omit<CorporateGroupProviderProps, 'corporateGroup'> {
	send: (
		event: any,
		payload?: EventData,
	) => Partial<State<CorporateGroupContext, any, any, any>>;
	current: Partial<State<CorporateGroupContext, any, any, any>>;
}
