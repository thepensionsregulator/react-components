import React from 'react';
import { Flex, P } from '@tpr/core';
import styles from './removedBox.module.scss';
import CommonStyles from '../cards.module.scss';

interface RemovedBoxProps {
	type: string;
}

const RemovedBox: React.FC<RemovedBoxProps> = ({ type }) => {
	return (
		<div role="alert" className={styles.confirmationBox}>
			<Flex
				cfg={{
					flex: '0 0 auto',
					alignItems: 'center',
					bg: 'neutral.5',
					justifyContent: 'center',
				}}
			>
				<P
					cfg={{
						fontSize: 3,
						color: 'white',
						textAlign: 'center',
						lineHeight: 3,
						p: 10,
					}}
					className={CommonStyles.noMarginBottom}
				>
					{type} removed successfully
				</P>
			</Flex>
		</div>
	);
};

export default React.memo(RemovedBox);
