import { useStoreContext } from '@alekna/react-store';
import { Observable } from 'rxjs';
import { useMemo, useState, useEffect, useRef } from 'react';

const useSelector = (
	stateName: string,
	pipe: <T>(selectedStore$: Observable<T>) => Observable<T> = str => str,
) => {
	// ERROR: types are broken, return type is not working.
	const { selectState, initialState } = useStoreContext();
	const initState = useMemo(() => initialState[stateName], [
		initialState,
		stateName,
	]);
	const [state, update]: any = useState(initState);
	const streamPipe = useRef(pipe).current;

	useEffect(() => {
		const stream = selectState(stateName)
			.pipe(streamPipe)
			.subscribe(update);

		return () => {
			stream.unsubscribe();
		};
	}, [stateName, selectState, update, streamPipe]);

	return state;
};

export default useSelector;
