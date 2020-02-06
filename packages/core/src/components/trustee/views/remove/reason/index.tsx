import React from 'react';
import { Flex } from '../../../../layout';
import { useTrusteeContext } from '../../../context';

const RemoveReason: React.FC = () => {
	const { send } = useTrusteeContext();

	return (
		<Flex flex="1 1 auto" flexDirection="column">
			<div>Remove Reason</div>
			<div>What is the reason?</div>
			<ul>
				<li>
					<button onClick={() => send('SELECT')}>
						They have left the scheme.
					</button>
				</li>
				<li>
					<button onClick={() => send('SELECT')}>
						They were never part of the scheme.
					</button>
				</li>
			</ul>
		</Flex>
	);
};

export default RemoveReason;
