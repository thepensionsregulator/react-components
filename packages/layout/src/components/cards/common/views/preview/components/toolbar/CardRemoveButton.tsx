import React from 'react';
import { ICardRemoveButtonProps } from '../../../../interfaces';
import { UnderlinedButton } from '../../../../../components/button';

export const CardRemoveButton: React.FC<ICardRemoveButtonProps> = React.memo(
	({ children, button, current, send, tabIndex = null }) => {
		const isEditing = !current.matches('preview');

		return (
			<UnderlinedButton
				buttonRef={button}
				giveFocus={current.context.lastBtnClicked === 2}
				heading={false}
				isOpen={isEditing}
				onClick={() => send('REMOVE')}
				tabIndex={tabIndex}
			>
				{children}
			</UnderlinedButton>
		);
	},
);
