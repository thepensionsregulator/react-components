import React from 'react';
import { UnderlinedButton } from '../../../../../components/button';

export const CardMainHeadingTitle: React.FC<{ title: string }> = ({
	title,
}) => <UnderlinedButton isMainHeading={true}>{title}</UnderlinedButton>;
