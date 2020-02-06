import React from 'react';
import { Flex } from '../../../layout';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../components/card';

const Name: React.FC = () => {
	const { send } = useTrusteeContext();

	return (
		<Flex flex="1 1 auto" flexDirection="column">
			<div>Edit Trustee Name</div>
			<Footer onContinue={{ title: 'Continue', fn: () => send('NEXT') }} />
		</Flex>
	);
};

export default Name;
