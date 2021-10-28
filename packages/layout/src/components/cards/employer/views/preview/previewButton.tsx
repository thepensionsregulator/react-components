import { UnderlinedButton } from '../../../components/button';
import { IPreviewButtonProps } from '../../../common/interfaces';
import React from 'react';
import { useEmployerContext } from '../../context';

export const PreviewButton: React.FC<IPreviewButtonProps> = ({
	button,
	children,
}) => {
	const { current, send } = useEmployerContext();
	const isEditing = !current.matches('preview');

	return (
		<UnderlinedButton
			buttonRef={button}
			giveFocus={current.context.lastBtnClicked === 5}
			isEditButton={true}
			isMainHeading={false}
			isOpen={isEditing}
			onClick={() => send('CHANGE_TYPE')}
		>
			{children}
		</UnderlinedButton>
	);
};
