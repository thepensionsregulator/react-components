import React, { useRef } from 'react';
import {
	IndependentTrusteeProvider,
	IndependentTrusteeProviderProps,
	useIndependentTrusteeContext,
} from './context';
import { Section } from '@tpr/core';
import { Toolbar } from '../components/toolbar';
import RemovedBox from '../components/removedBox';
import { Preview } from './views/preview/preview';
import { Regulator } from './views/regulator/regulator';
import { ReasonRemove } from './views/remove/reason/reason';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import { cardTypeName } from '../common/interfaces';
import { IndependentTrusteeContext } from './independentTrusteeMachine';
import { concatenateStrings } from '../../../utils';
import {
	CardMainHeadingTitle,
	CardRemoveButton,
	Subtitle,
} from '../common/views/preview/components';
import styles from '../cards.module.scss';

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

const isComplete = (context: IndependentTrusteeContext) => {
	return context.preValidatedData ? true : context.complete;
};

export const IndependentTrusteeCard: React.FC<IndependentTrusteeProviderProps> = React.memo(
	({ testId, cfg, ...rest }) => {
		const removeButtonRef = useRef(null);

		return (
			<IndependentTrusteeProvider {...rest}>
				{({ current, send, i18n }) => {
					const RemoveButton = () => (
						<CardRemoveButton
							button={removeButtonRef}
							send={send}
							current={current}
						>
							{i18n.preview.buttons.two}
						</CardRemoveButton>
					);

					return (
						<Section
							cfg={cfg}
							data-testid={testId}
							className={styles.card}
							ariaLabel={concatenateStrings([
								current.context.independentTrustee.organisationName,
								i18n.preview.trusteeType,
							])}
						>
							<Toolbar
								buttonLeft={() => (
									<CardMainHeadingTitle title={i18n.preview.buttons.one} />
								)}
								buttonRight={RemoveButton}
								complete={isComplete(current.context)}
								subtitle={() => (
									<Subtitle
										main={current.context.independentTrustee.organisationName}
										secondary={i18n.preview.trusteeType}
									/>
								)}
								statusText={
									isComplete(current.context)
										? i18n.preview.statusText.confirmed
										: i18n.preview.statusText.unconfirmed
								}
							/>
							<CardContentSwitch />
						</Section>
					);
				}}
			</IndependentTrusteeProvider>
		);
	},
);
