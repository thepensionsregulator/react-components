import React from 'react';
import { Flex } from '@tpr/core';
import { UnderlinedButton } from './button';
import styles from './cardContentSectionHeader.module.scss';

interface CardContentSectionHeaderProps {
	sectionHeaderText: string;
	send?: Function;
}
const CardContentSectionHeader: React.FC<CardContentSectionHeaderProps> = ({
	sectionHeaderText,
	send,
}) => {
	return (
		<Flex className={styles.contentHeader}>
			<UnderlinedButton
				onClick={() => send('CANCEL')}
				isOpen={true}
				isEditButton={true}
				giveFocus={true}
			>
				{sectionHeaderText}
			</UnderlinedButton>
		</Flex>
	);
};

export default React.memo(CardContentSectionHeader);
