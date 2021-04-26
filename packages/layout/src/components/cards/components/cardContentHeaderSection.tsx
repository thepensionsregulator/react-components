import React from 'react';
import { UnderlinedButton } from './button';

interface CardContentSectionHeaderProps {
	sectionHeaderText: string;
	send?: Function;
}
export const CardContentSectionHeader: React.FC<CardContentSectionHeaderProps> = ({
	sectionHeaderText,
	send,
}) => {
	return (
		<UnderlinedButton
			onClick={() => {
				send('CANCEL');
			}}
			isOpen={true}
		>
			{sectionHeaderText}
		</UnderlinedButton>
	);
};

export default CardContentSectionHeader;
