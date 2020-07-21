import { Machine } from 'xstate';
import { InsurerProps } from './context';

interface InsurerStates {
	states: {
		preview: {};
	};
}

type InsurerEvents = { type: 'CHANGE_TYPE' };

export interface InsurerContext {
	complete: boolean;
	remove: { confirm: boolean; date: string } | null;
	insurer: Partial<InsurerProps>;
}

const insurerMachine = Machine<InsurerContext, InsurerStates, InsurerEvents>({
	id: 'insurer',
	initial: 'preview',
	context: {
		complete: false,
		remove: null,
		insurer: {},
	},
	states: {
		preview: {
			id: 'preview',
		},
	},
});

export default insurerMachine;
