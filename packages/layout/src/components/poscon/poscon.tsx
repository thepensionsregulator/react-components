import React from 'react';
import { ClosablePoscon } from './components/closablePoscon';
import { PersistentPoscon } from './components/persistentPoscon';
import { PosconCfgType, PosconProps } from './components/types';

export const Poscon: React.FC<PosconProps> = ({
	callback,
	cfg,
	closeButtonColor = 'white',
	color = 'success.1',
	enableClose = false,
	children,
}) => {
	const defaultstyles: PosconCfgType = {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		bg: color,
		pl: 10,
		pr: 10,
		pt: enableClose ? 10 : 6,
		pb: enableClose ? 10 : 6,
		textAlign: 'center',
	};

	const posconCfg: PosconCfgType = {
		...defaultstyles,
		...cfg,
	};

	return enableClose ? (
		<ClosablePoscon
			cfg={posconCfg}
			callback={callback}
			closeButtonColor={closeButtonColor}
		>
			{children}
		</ClosablePoscon>
	) : (
		<PersistentPoscon cfg={posconCfg}>{children}</PersistentPoscon>
	);
};
