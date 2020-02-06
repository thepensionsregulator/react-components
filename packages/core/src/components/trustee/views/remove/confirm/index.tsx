import React from 'react';
import { Flex } from '../../../../layout';
import { useTrusteeContext } from '../../../context';
import { Footer } from '../../../components/card';

const RemoveConfirm: React.FC = () => {
	const { send } = useTrusteeContext();

	return (
		<Flex flex="1 1 auto" flexDirection="column">
			<div>Remove Confirm</div>
			<div>This can't be undone.</div>
			<Footer
				onContinue={{ title: 'Remove', fn: () => console.log('remove') }}
				onSave={{ title: 'Cancel', fn: () => send('CANCEL') }}
			/>
		</Flex>
	);
};

export default RemoveConfirm;
