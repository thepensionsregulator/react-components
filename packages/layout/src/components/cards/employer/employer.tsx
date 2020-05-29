import React from 'react';
import { UnderlinedButton } from '../components/button';
import { Toolbar } from '../components/toolbar';
import { P } from '@tpr/core';
import styles from '../cards.module.scss';

export const Employer = ({ testId, complete = false }: any) => {
	return (
		<div data-testid={testId} className={styles.card}>
			<Toolbar
				complete={complete}
				subtitle={() => <P>Principal and participating employer</P>}
				buttonLeft={() => (
					<UnderlinedButton isOpen={false} onClick={() => {}}>
						Employer type
					</UnderlinedButton>
				)}
				buttonRight={() => (
					<UnderlinedButton isOpen={false} onClick={() => {}}>
						Remove
					</UnderlinedButton>
				)}
			/>
			<div>card content</div>
		</div>
	);
};
