import React, { useRef } from 'react';
import {
	ThirdPartyProvider,
	ThirdPartyProviderProps,
	useThirdPartyContext,
} from './context';
import { Section } from '@tpr/core';
import { Toolbar } from '../components/toolbar';
import { Preview } from './views/preview/preview';
import { RemoveDateForm } from './views/remove/date/date';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import RemovedBox from '../components/removedBox';
import { cardTypeName } from '../common/interfaces';
import { ThirdPartyContext } from './thirdPartyMachine';
import {
	CardMainHeadingTitle,
	CardRemoveButton,
	Subtitle,
} from '../common/views/preview/components';
import { concatenateStrings } from '../../../utils';
import styles from '../cards.module.scss';

const CardContentSwitch: React.FC = () => {
	const { current } = useThirdPartyContext();
	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches({ remove: 'date' }):
			return <RemoveDateForm />;
		case current.matches({ remove: 'confirm' }):
			return <ConfirmRemove />;
		case current.matches({ remove: 'deleted' }):
			// message to show when successfuly deleted.
			return <RemovedBox type={cardTypeName.thirdParty} />;
		default:
			return null;
	}
};

const isComplete = (context: ThirdPartyContext) => {
	return context.preValidatedData ? true : context.complete;
};

export const ThirdPartyCard: React.FC<ThirdPartyProviderProps> = React.memo(
	({ testId, cfg, ...rest }) => {
		const removeButtonRef = useRef(null);

		return (
			<ThirdPartyProvider {...rest}>
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
								current.context.thirdParty.organisationName,
								i18n.preview.buttons.one,
							])}
						>
							<Toolbar
								buttonLeft={() => (
									<CardMainHeadingTitle
										title={current.context.thirdParty.organisationName}
									/>
								)}
								buttonRight={RemoveButton}
								complete={isComplete(current.context)}
								subtitle={() => <Subtitle main={i18n.preview.buttons.one} />}
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
			</ThirdPartyProvider>
		);
	},
);
