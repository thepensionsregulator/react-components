import React from 'react';
import { CheckedCircle, ErrorCircle } from '@tpr/icons';
import { SidebarLinkProps } from './types';

const StatusIcon: React.FC<{ link: SidebarLinkProps }> = ({ link }) => {
	return link.completed ? (
		<CheckedCircle cfg={{ fill: 'success.1' }} />
	) : (
		<ErrorCircle cfg={{ fill: link.disabled ? 'danger.1' : 'danger.2' }} />
	);
};

export default React.memo(StatusIcon);