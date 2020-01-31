import React from 'react';
import { Flex } from '../../../layout';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../components/card';

const Address: React.FC = () => {
	const { send } = useTrusteeContext();

	return (
		<Flex flex="1 1 auto" flexDirection="column">
			<div>Address</div>
			<Footer onSave={() => send('SAVE')} />
		</Flex>
	);
};

export default Address;
