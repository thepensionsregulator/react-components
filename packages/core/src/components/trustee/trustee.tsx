import { useMachine } from '@xstate/react';
import trusteeMachine from './trusteeMachine';

export const Trustee = ({ initialState }) => {
	const [current, send] = useMachine(trusteeMachine, {
		context: initialState,
	});

	// if (current.matches('idle')) {
	//   return /* ... */;
	// } else if (current.matches('trusteeName')) {
	//   return /* ... */;
	// } else if (current.matches('trusteeType')) {
	//   return /* ... */;
	// } else {
	//   return null;
	// }

	return null;
};
