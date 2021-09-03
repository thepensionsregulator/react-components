import React from 'react';
import { ICardMainHeadingButtonProps } from '../../../../../interfaces';
import { UnderlinedButton } from '../../../../../../components/button';

export const CardMainHeadingButton: React.FC<ICardMainHeadingButtonProps> = React.memo(
	({ children, button, current, onClick }) => {
		const isEditing = !current.matches('preview');

		return (
			<UnderlinedButton
				buttonRef={button}
				giveFocus={current.context.lastBtnClicked === 1}
				isEditButton={true}
				isMainHeading={true}
				isOpen={isEditing}
				onClick={onClick}
			>
				{children}
			</UnderlinedButton>
		);
	},
);
