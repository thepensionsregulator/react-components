import React from 'react';
import {
	InsurerProvider,
	InsurerProviderProps,
	useInsurerContext,
} from './context';
import { Section } from '@tpr/core';
import { Toolbar } from '../components/toolbar';
import { UnderlinedButton } from '../components/button';
import { Preview } from './views/preview/preview';
import { RemoveDateForm } from './views/remove/date/date';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import { Reference } from './views/reference';
import RemovedBox from '../components/removedBox';
import { cardTypeName } from '../common/interfaces';
import { InsurerContext } from './insurerMachine';
import { Subtitle } from '../common/views/preview/components';
import { concatenateStrings } from '../../../utils';
import styles from '../cards.module.scss';

const CardContentSwitch: React.FC = () => {
	const { current } = useInsurerContext();
	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches({ edit: 'reference' }):
			return <Reference />;
		case current.matches({ remove: 'date' }):
			return <RemoveDateForm />;
		case current.matches({ remove: 'confirm' }):
			return <ConfirmRemove />;
		case current.matches({ remove: 'deleted' }):
			// message to show when successfuly deleted.
			return <RemovedBox type={cardTypeName.insurer} />;
		default:
			return null;
	}
};

const InsurerButton: React.FC<{ title: string }> = ({ title }) => (
	<UnderlinedButton isMainHeading={true}>{title}</UnderlinedButton>
);

const RemoveButton: React.FC = () => {
	const { current, send, i18n } = useInsurerContext();
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
			notHeading={true}
		>
			{i18n.preview.buttons.two}
		</UnderlinedButton>
	);
};

const isComplete = (context: InsurerContext) => {
	return context.preValidatedData ? true : context.complete;
};

export const InsurerCard: React.FC<InsurerProviderProps> = React.memo(
	({ testId, cfg, ...rest }) => {
		return (
			<InsurerProvider {...rest}>
				{({ current: { context }, i18n }) => {
					return (
						<Section
							cfg={cfg}
							data-testid={testId}
							className={styles.card}
							ariaLabel={concatenateStrings([
								context.insurer.organisationName,
								i18n.preview.buttons.one,
							])}
						>
							<Toolbar
								buttonLeft={() => (
									<InsurerButton title={i18n.preview.buttons.one} />
								)}
								buttonRight={RemoveButton}
								complete={isComplete(context)}
								subtitle={() => (
									<Subtitle main={context.insurer.organisationName} />
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
			</InsurerProvider>
		);
	},
);
