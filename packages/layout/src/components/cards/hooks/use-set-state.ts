import { useReducer, useEffect, useRef } from 'react';

function useSetReducer(initialState) {
	const [state, setState] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		initialState,
	);

	return [state, setState];
}

export default function useSetState(initialState) {
	const [state, setState] = useSetReducer(initialState);

	const mountedRef = useRef(false);
	useEffect(() => {
		mountedRef.current = true;
		return () => (mountedRef.current = false);
	});
	const setSafeState = (...args) => mountedRef.current && setState(...args);
	return [state, setSafeState];
}
