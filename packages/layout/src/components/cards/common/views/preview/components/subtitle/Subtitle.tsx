import React from 'react';
import { P } from '@tpr/core';
import styles from '../../../../../cards.module.scss';

interface SubtitleProps {
	main?: string;
	secondary?: string;
	mainNotBold?: boolean;
}

export const Subtitle: React.FC<SubtitleProps> = React.memo(
	({ main, secondary, mainNotBold = false }) => {
		return (
			<>
				{main && (
					<P
						className={
							mainNotBold
								? styles.personOrCompanyRole
								: styles.personOrCompanyName
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
