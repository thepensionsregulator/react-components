import React from 'react';
import { P } from '@tpr/core';
import styles from '../../../../../cards.module.scss';

interface SubtitleProps {
	main?: string;
	secondary?: string;
	mainBold?: boolean;
}

export const Subtitle: React.FC<SubtitleProps> = React.memo(
	({ main, secondary, mainBold = true }) => {
		return (
			<>
				{main && (
					<P
						className={
							mainBold ? styles.personOrCompanyName : styles.personOrCompanyRole
						}
					>
						{main}
					</P>
				)}
				{secondary && <P className={styles.personOrCompanyRole}>{secondary}</P>}
			</>
		);
	},
);
