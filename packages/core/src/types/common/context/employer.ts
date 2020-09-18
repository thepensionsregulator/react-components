import { EventData, State } from 'xstate';
import { Employer, EmployerProviderProps } from '../providers/employer';

export interface EmployerContext {
	complete: boolean;
	remove: { confirm: boolean; date: string } | null;
	employer: Partial<Employer>;
	preValidatedData?: boolean | null;
}

export interface EmployerContextProps
	extends Omit<EmployerProviderProps, 'employer'> {
	send: (
		event: any,
		payload?: EventData,
	) => Partial<State<EmployerContext, any, any, any>>;
	current: Partial<State<EmployerContext, any, any, any>>;
}
