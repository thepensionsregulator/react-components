import React from 'react';
import {
	NewActuaryProvider,
	NewActuaryProviderProps,
	useNewActuaryContext,
} from './context';
import { Flex, H4 } from '@tpr/core';
import { Toolbar } from '../components/toolbar';
import { UnderlinedButton } from '../components/button';
import { Preview } from './views/preview/preview';
import { Contacts } from './views/contacts';
import { RemoveDateForm } from './views/remove/date';
import { ConfirmRemove } from './views/remove/confirm';
import { NameScreen } from './views/name';
import RemovedBox from '../components/removedBox';
import styles from '../cards.module.scss';

const CardContentSwitch: React.FC = () => {
	const { current } = useNewActuaryContext();

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
			return <RemovedBox type="actuary" />;
		default:
			return null;
	}
};

const NewActuaryButton: React.FC = () => {
	const { current, send, i18n } = useNewActuaryContext();

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

const RemoveButton: React.FC<{ title: string }> = ({ title }) => {
	const { current, send } = useNewActuaryContext();
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

export const NewActuaryCard: React.FC<NewActuaryProviderProps> = ({
	testId,
	cfg,
	...rest
}) => {
	return (
		<NewActuaryProvider {...rest}>
			{({ current: { context }, i18n }) => {
				return (
					<Flex cfg={cfg} data-testid={testId} className={styles.card}>
						<Toolbar
							complete={context.complete}
							subtitle={() => (
								<H4 cfg={{ lineHeight: 3 }}>
									{[
										context.actuary.title,
										context.actuary.firstname,
										context.actuary.lastname,
									]
										.filter(Boolean)
										.join(' ')}
								</H4>
							)}
							buttonLeft={() => <NewActuaryButton />}
							buttonRight={() => (
								<RemoveButton title={i18n.preview.buttons.two} />
							)}
						/>
						<CardContentSwitch />
					</Flex>
				);
			}}
		</NewActuaryProvider>
	);
};
