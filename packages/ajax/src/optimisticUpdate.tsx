import { useAjaxContext } from './context';
import { useSelector } from '@alekna/react-store';
import { StoreState } from './reducer';

type UpdateProps = {
	store: string;
};

export const useUpdate = ({ store }: UpdateProps) => {
	const { dispatch } = useAjaxContext();
	/** Select state from the global state efficiently. Update only if
	 * prev state does not match new state */
	const state = useSelector<StoreState>(store);
	/** Send actions to the store */

	function updateStore(payload) {
		return dispatch({ type: `${store}@update`, payload });
	}

	return null;
};
