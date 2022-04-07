import React from 'react';
import govuk from './govuk-frontend.module.scss';
import { WarningText as GovUkWarningText } from '@tpr/govuk-react-jsx';
import { IWarningTextProps } from './IWarningTextProps';
import { classNames } from '@tpr/core';

export const WarningText: React.FC<IWarningTextProps> = ({
	children,
	className,
	...rest
}) => {
	return (
		<GovUkWarningText
			govukClassNames={govuk}
			className={classNames([govuk.warningText, className])}
			{...rest}
		>
			{children}
		</GovUkWarningText>
	);
};
