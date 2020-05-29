import React, { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';
import employerMachine, { EmployerContext as EC } from './employerMachine';
import { State, EventData } from 'xstate';

export const EmployerContext = createContext<EmployerContextProps>({
	current: {},
	send: (_, __) => ({}),
	onCorrect: () => {},
	onRemove: () => new Promise((res) => res()),
	onSave: () => new Promise((res) => res()),
});

type RenderProps = (_: EmployerContextProps) => ReactElement;

export interface EmployerInput {
	id: string;
}

export interface EmployerContextProps extends Omit<EmployerProps, 'employer'> {
	send: (event: any, payload?: EventData) => Partial<State<EC, any, any, any>>;
	current: Partial<State<EC, any, any, any>>;
}

export interface EmployerProps {
	complete?: boolean;
	onCorrect?: (...args: any[]) => void;
	onRemove?: (...args: any[]) => Promise<any>;
	onSave?: (...args: any[]) => Promise<any>;
	testId?: string;
	employer: EmployerInput;
	children?: RenderProps | ReactElement;
}

export const EmployerProvider = ({
	complete,
	employer,
	children,
	onSave,
	...rest
}: EmployerProps) => {
	const [current, send] = useMachine(employerMachine, {
		context: {
			complete,
			employer,
		},
		services: {
			saveData: ({ employer }) => onSave(employer),
		},
	});

	const ui =
		typeof children === 'function'
			? children({ current, send, ...rest })
			: children;
	return (
		<EmployerContext.Provider value={{ current, send, ...rest }}>
			{ui}
		</EmployerContext.Provider>
	);
};

export const useEmployerContext = (): EmployerContextProps => {
	const employerUtils = useContext(EmployerContext);
	if (!employerUtils) {
		throw new Error(
			`Employer compound components cannot be rendered outside the EmployerProvider component`,
		);
	}
	return employerUtils;
};
