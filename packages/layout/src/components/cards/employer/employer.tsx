import React from 'react';
import { UnderlinedButton } from '../components/button';
import { Toolbar } from '../components/toolbar';
import { Flex, P } from '@tpr/core';
import styles from '../cards.module.scss';
import { EmployerProvider, useEmployerContext, EmployerProps } from './context';
import { Preview } from './views/preview/preview';
import { DateForm } from './views/remove/date/date';
import { EmployerType } from './views/type/type';

const CardContentSwitch: React.FC = () => {
	const { current } = useEmployerContext();
	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches('employerType'):
			return <EmployerType />;
		case current.matches({ remove: 'date' }):
			return <DateForm />;
		case current.matches({ remove: 'confirm' }):
			return <div>confirm if you want to delete Employer</div>;
		default:
			return null;
	}
};

export const Employer: React.FC<EmployerProps> = ({ testId, cfg, ...rest }) => {
	return (
		<EmployerProvider {...rest}>
			{({ current: { context }, send }) => (
				<Flex cfg={cfg} data-testid={testId} className={styles.card}>
					<Toolbar
						complete={context.complete}
						subtitle={() => <P>Principal and participating employer</P>}
						buttonLeft={() => (
							<UnderlinedButton
								isOpen={false}
								onClick={() => send('CHANGE_TYPE')}
							>
								Employer type
							</UnderlinedButton>
						)}
						buttonRight={() => (
							<UnderlinedButton isOpen={false} onClick={() => send('REMOVE')}>
								Remove
							</UnderlinedButton>
						)}
					/>
					<CardContentSwitch />
				</Flex>
			)}
		</EmployerProvider>
	);
};
