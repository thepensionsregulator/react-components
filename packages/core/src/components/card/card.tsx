import { useMachine } from '@xstate/react';
import cardMachine from './cardMachine';

export const Card = () => {
	const [current, send] = useMachine(cardMachine, {});

	return null;
};
