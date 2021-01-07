import React from 'react';
import {
	IndependentTrusteeProvider,
	IndependentTrusteeProviderProps,
	useIndependentTrusteeContext,
} from './context';
import { Flex, H4, P } from '@tpr/core';
import { Toolbar } from '../components/toolbar';
import { UnderlinedButton } from '../components/button';
import RemovedBox from '../components/removedBox';
import { Preview } from './views/preview/preview';
import { Regulator } from './views/regulator/regulator';
import { ReasonRemove } from './views/remove/reason/reason';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import { cardTypeName } from '../common/interfaces';
import styles from '../cards.module.scss';
import { IndependentTrusteeContext } from './independentTrusteeMachine';

const CardContentSwitch: React.FC = () => {
	const { current } = useIndependentTrusteeContext();

	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches({ edit: 'regulator' }):
			return <Regulator />;
		case current.matches({ remove: 'reason' }):
			return <ReasonRemove />;
		case current.matches({ remove: 'confirm' }):
			return <ConfirmRemove />;
		case current.matches({ remove: 'deleted' }):
			return <RemovedBox type={cardTypeName.independent} />;
		default:
			return null;
	}
};

const RemoveButton: React.FC<{ title: string }> = ({ title }) => {
	const { current, send } = useIndependentTrusteeContext();

	return (
		<UnderlinedButton
			isOpen={
				current.matches({ remove: 'reason' }) ||
				current.matches({ remvve: 'confirm' })
			}
			onClick={() => {
				if (
					current.matches({ remove: 'reason' }) ||
					current.matches({ remove: 'confirm' })
				) {
					send('CANCEL');
				} else {
					send('REMOVE');
				}
			}}
		>
			{title}
		</UnderlinedButton>
	);
};

const isComplete = (context: IndependentTrusteeContext) => {
	return context.preValidatedData ? true : context.complete;
}

export const IndependentTrusteeCard: React.FC<IndependentTrusteeProviderProps> = ({
	testId,
	cfg,
	...rest
}) => {
	return (
		<IndependentTrusteeProvider {...rest}>
			{({ current: { context }, i18n }) => {
				return (
					<Flex cfg={cfg} data-testid={testId} className={styles.card}>
						<Toolbar
							complete={isComplete(context)}
							subtitle={() => (
								<>
									<H4 cfg={{ lineHeight: 3 }}>
										{context.independentTrustee.organisationName}
									</H4>
									<P>{i18n.preview.trusteeType}</P>
								</>
							)}
							statusText={isComplete(context) ? i18n.preview.statusText.confirmed: i18n.preview.statusText.unconfirmed}
							buttonLeft={() => (
								<UnderlinedButton>{i18n.preview.buttons.one}</UnderlinedButton>
							)}
							buttonRight={() => (
								<RemoveButton title={i18n.preview.buttons.two} />
							)}
							extraPB={true}
						/>
						<CardContentSwitch />
					</Flex>
				);
			}}
		</IndependentTrusteeProvider>
	);
};
