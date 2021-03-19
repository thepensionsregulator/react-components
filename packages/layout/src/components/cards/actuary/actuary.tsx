import React from 'react';
import {
	ActuaryProvider,
	ActuaryProviderProps,
	useActuaryContext,
} from './context';
import { Section, Span, P } from '@tpr/core';
import { Toolbar } from '../components/toolbar';
import { UnderlinedButton } from '../components/button';
import { Preview } from './views/preview/preview';
import { Contacts } from './views/contacts';
import { RemoveDateForm } from './views/remove/date/date';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import { NameScreen } from './views/name';
import RemovedBox from '../components/removedBox';
import { cardTypeName } from '../common/interfaces';
import styles from '../cards.module.scss';
import { ActuaryContext } from './actuaryMachine';
import { removeFromTabFlowIfMatches, concatenateStrings } from '../../../utils';

const CardContentSwitch: React.FC = () => {
	const { current } = useActuaryContext();

	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches({ edit: 'contacts' }):
			return <Contacts />;
		case current.matches({ edit: 'name' }):
			return <NameScreen />;
		case current.matches({ remove: 'date' }):
			return <RemoveDateForm />;
		case current.matches({ remove: 'confirm' }):
			return <ConfirmRemove />;
		case current.matches({ remove: 'deleted' }):
			// message to show when successfuly deleted.
			return <RemovedBox type={cardTypeName.actuary} />;
		default:
			return null;
	}
};

const ActuaryButton: React.FC = () => {
	const { current, send, i18n } = useActuaryContext();

	const onOfStatesIsActive =
		current.matches({ edit: 'contacts' }) ||
		current.matches({ edit: 'name' }) ||
		current.matches({ remove: 'date' }) ||
		current.matches({ remove: 'confirm' }) ||
		current.matches({ remove: 'deleted' });

	return (
		<UnderlinedButton
			isOpen={onOfStatesIsActive}
			onClick={() => {
				if (onOfStatesIsActive) {
					send('CANCEL');
				} else {
					send('EDIT_NAME');
				}
			}}
		>
			{i18n.preview.buttons.one}
		</UnderlinedButton>
	);
};

const RemoveButton: React.FC<{ title: string; tabIndex?: number }> = ({
	title,
	tabIndex,
}) => {
	const { current, send } = useActuaryContext();
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
			tabIndex={tabIndex}
		>
			{title}
		</UnderlinedButton>
	);
};

const isComplete = (context: ActuaryContext) => {
	return context.preValidatedData ? true : context.complete;
};

export const ActuaryCard: React.FC<ActuaryProviderProps> = ({
	testId,
	cfg,
	...rest
}) => {
	return (
		<ActuaryProvider {...rest}>
			{({ current, i18n }) => {
				return (
					<Section
						cfg={cfg}
						data-testid={testId}
						className={styles.card}
						ariaLabel={concatenateStrings([
							current.context.actuary.title,
							current.context.actuary.firstName,
							current.context.actuary.lastName,
							i18n.preview.buttons.one,
						])}
					>
						<Toolbar
							complete={isComplete(current.context)}
							subtitle={() => (
								<>
									<Span cfg={{ lineHeight: 3 }} className={styles.styledAsH4}>
										{concatenateStrings([
											current.context.actuary.title,
											current.context.actuary.firstName,
											current.context.actuary.lastName,
										])}
									</Span>
									<P>{current.context.actuary.organisationName}</P>
								</>
							)}
							statusText={
								isComplete(current.context)
									? i18n.preview.statusText.confirmed
									: i18n.preview.statusText.unconfirmed
							}
							buttonLeft={() => <ActuaryButton />}
							buttonRight={() => (
								<RemoveButton
									title={i18n.preview.buttons.two}
									tabIndex={removeFromTabFlowIfMatches(current, {
										edit: 'name',
									})}
								/>
							)}
						/>
						<CardContentSwitch />
					</Section>
				);
			}}
		</ActuaryProvider>
	);
};
