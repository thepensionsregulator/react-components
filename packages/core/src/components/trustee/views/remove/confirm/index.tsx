import React from 'react';
import { Flex } from '../../../../layout';
import { H3, P } from '../../../../typography';
import { useTrusteeContext } from '../../../context';
import { Footer } from '../../../components/card';

const RemoveConfirm: React.FC = () => {
	const { current, send, onRemove } = useTrusteeContext();
	const { leftTheScheme } = current.context;

	return (
		<Flex flex="1 1 auto" flexDirection="column">
			<H3>Are you sure you want to remove this trustee?</H3>
			<Flex
				flex="1 1 auto"
				borderBottom="1px solid"
				borderColor="neutral.100"
				my={2}
			/>
			<P color="neutral.300">This can't be undone.</P>
			<Footer
				onContinue={{
					title: 'Remove',
					intent: 'danger',
					fn: () =>
						onRemove({
							id: 'trustee_id_here',
							reason: {
								leftTheScheme: leftTheScheme ? true : false,
								date: leftTheScheme,
							},
						}),
				}}
				onSave={{
					title: 'Cancel',
					appearance: 'link',
					fn: () => send('CANCEL'),
				}}
			/>
		</Flex>
	);
};

export default RemoveConfirm;
