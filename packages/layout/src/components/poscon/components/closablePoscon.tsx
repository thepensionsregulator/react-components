import React, { useState } from 'react';
import { CrossButton } from '../../buttons/buttons';
import { ClosablePosconProps } from './types';
import { PersistentPoscon } from './persistentPoscon';
import Styles from '../poscon.module.scss';

export const ClosablePoscon: React.FC<ClosablePosconProps> = React.memo(
	({ cfg, callback, closeButtonColor, children }) => {
		const [closed, setClosed] = useState<boolean>(false);

		const CloseButton: React.FC = () => (
			<div className={Styles.closeButton}>
				<CrossButton
					colour={closeButtonColor}
					onClick={() => {
						setClosed(!closed);
						callback && callback();
					}}
				/>
			</div>
		);

		return (
			<>
				{!closed && (
					<div className={Styles.wrapper}>
						<CloseButton />
						<PersistentPoscon cfg={cfg}>{children}</PersistentPoscon>
					</div>
				)}
			</>
		);
	},
);
