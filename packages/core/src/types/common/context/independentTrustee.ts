import { EventData, State } from 'xstate';
import { RemoveReasonProps } from '../interfaces';
import {
	IndependentTrustee,
	IndependentTrusteeProviderProps,
} from '../providers';

export interface IndependentTrusteeContext {
	complete: boolean;
	remove?: RemoveReasonProps;
	independentTrustee: Partial<IndependentTrustee>;
	preValidatedData?: boolean | null;
}

export interface IndependentTrusteeContextProps
	extends Omit<IndependentTrusteeProviderProps, 'independentTrustee'> {
	send: (
		event: any,
		payload?: EventData,
	) => Partial<State<IndependentTrusteeContext, any, any, any>>;
	current: Partial<State<IndependentTrusteeContext, any, any, any>>;
}
