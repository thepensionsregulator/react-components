import useSetState from './use-set-state';

export default function useLoading(initialLoading = false) {
	const [{ loading }, setLoading] = useSetState({ loading: initialLoading });

	const setLoadingState = (isLoading: boolean) => {
		setLoading({ loading: isLoading });
	};

	return [loading, setLoadingState];
}
