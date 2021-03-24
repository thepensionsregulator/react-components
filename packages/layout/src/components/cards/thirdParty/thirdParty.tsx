import React from 'react';
import {
	ThirdPartyProvider,
	ThirdPartyProviderProps,
	useThirdPartyContext,
} from './context';
import { Section, P } from '@tpr/core';
import { Toolbar } from '../components/toolbar';
import { UnderlinedButton } from '../components/button';
import { Preview } from './views/preview/preview';
import { RemoveDateForm } from './views/remove/date/date';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import RemovedBox from '../components/removedBox';
import { cardTypeName } from '../common/interfaces';
import { ThirdPartyContext } from './thirdPartyMachine';
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

const ToolbarButton: React.FC<{ title: string }> = ({ title }) => {
	const { current, send } = useThirdPartyContext();
	return (
		<UnderlinedButton
			isOpen={
				current.matches({ remove: 'date' }) ||
				current.matches({ remove: 'confirm' })
			}
			onClick={() => {
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
			{title}
		</UnderlinedButton>
	);
};

const isComplete = (context: ThirdPartyContext) => {
	return context.preValidatedData ? true : context.complete;
};

export const ThirdPartyCard: React.FC<ThirdPartyProviderProps> = ({
	testId,
	cfg,
	...rest
}) => {
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
							complete={isComplete(context)}
							subtitle={() => (
								<P className={styles.personOrCompanyName}>
									{context.thirdParty.organisationName}
								</P>
							)}
							statusText={
								isComplete(context)
									? i18n.preview.statusText.confirmed
									: i18n.preview.statusText.unconfirmed
							}
							buttonLeft={() => (
								<UnderlinedButton>{i18n.preview.buttons.one}</UnderlinedButton>
							)}
							buttonRight={() => (
								<ToolbarButton title={i18n.preview.buttons.two} />
							)}
						/>
						<CardContentSwitch />
					</Section>
				);
			}}
		</ThirdPartyProvider>
	);
};
