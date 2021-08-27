import React from 'react';
import {
	ThirdPartyProvider,
	ThirdPartyProviderProps,
	useThirdPartyContext,
} from './context';
import { Section } from '@tpr/core';
import { Toolbar } from '../components/toolbar';
import { UnderlinedButton } from '../components/button';
import { Preview } from './views/preview/preview';
import { RemoveDateForm } from './views/remove/date/date';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import RemovedBox from '../components/removedBox';
import { cardTypeName } from '../common/interfaces';
import { ThirdPartyContext } from './thirdPartyMachine';
import { Subtitle } from '../common/views/preview/components';
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

const ThirdPartyBtn: React.FC<{ title: string }> = ({ title }) => (
	<UnderlinedButton isMainHeading={true}>{title}</UnderlinedButton>
);

const RemoveButton: React.FC = () => {
	const { current, send, i18n } = useThirdPartyContext();
	return (
		<UnderlinedButton
			isOpen={
				current.matches({ remove: 'date' }) ||
				current.matches({ remove: 'confirm' })
			}
			onClick={() => {
				current.context.lastBtnClicked = 2;
				if (
					current.matches({ remove: 'date' }) ||
					current.matches({ remove: 'confirm' })
				) {
					send('CANCEL');
				} else {
					send('REMOVE');
				}
			}}
		>
			{i18n.preview.buttons.two}
		</UnderlinedButton>
	);
};

const isComplete = (context: ThirdPartyContext) => {
	return context.preValidatedData ? true : context.complete;
};

export const ThirdPartyCard: React.FC<ThirdPartyProviderProps> = React.memo(
	({ testId, cfg, ...rest }) => {
		return (
			<ThirdPartyProvider {...rest}>
				{({ current: { context }, i18n }) => {
					return (
						<Section
							cfg={cfg}
							data-testid={testId}
							className={styles.card}
							ariaLabel={concatenateStrings([
								context.thirdParty.organisationName,
								i18n.preview.buttons.one,
							])}
						>
							<Toolbar
								buttonLeft={() => (
									<ThirdPartyBtn title={i18n.preview.buttons.one} />
								)}
								buttonRight={RemoveButton}
								complete={isComplete(context)}
								subtitle={() => (
									<Subtitle main={context.thirdParty.organisationName} />
								)}
								statusText={
									isComplete(context)
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
