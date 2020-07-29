import React from 'react';
import {
	InHouseAdminProvider,
	InHouseAdminProviderProps,
	useInHouseAdminContext,
} from './context';
import { Flex, H4 } from '@tpr/core';
import { Toolbar } from '../components/toolbar';
import { UnderlinedButton } from '../components/button';
import { Preview } from './views/preview/preview';
import { Contacts } from './views/contacts';
import { DateForm } from './views/remove/date/date';
import { Confirm } from './views/remove/confirm/confirm';
import { AddressPage } from './views/address/index';
import { NameScreen } from './views/name';
import styles from '../cards.module.scss';

const CardContentSwitch: React.FC = () => {
	const { current } = useInHouseAdminContext();

	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches({ edit: 'address' }):
			return <AddressPage />;
		case current.matches({ edit: 'contacts' }):
			return <Contacts />;
		case current.matches({ edit: 'name' }):
			return <NameScreen />;
		case current.matches({ remove: 'date' }):
			return <DateForm />;
		case current.matches({ remove: 'confirm' }):
			return <Confirm />;
		case current.matches({ remove: 'deleted' }):
			// TODO: some nice message to show it has been successfuly deleted.
			return <div>in house admin deleted successfuly</div>;
		default:
			return null;
	}
};

const InHouseAdminButton: React.FC = () => {
	const { current, send, i18n } = useInHouseAdminContext();

	const onOfStatesIsActive =
		current.matches({ edit: 'address' }) ||
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
	const { current, send } = useInHouseAdminContext();
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

export const InHouseAdmin: React.FC<InHouseAdminProviderProps> = ({
	testId,
	cfg,
	...rest
}) => {
	return (
		<InHouseAdminProvider {...rest}>
			{({ current: { context }, i18n }) => {
				return (
					<Flex cfg={cfg} data-testid={testId} className={styles.card}>
						<Toolbar
							complete={context.complete}
							subtitle={() => (
								<H4 cfg={{ lineHeight: 3 }}>
									{[
										context.inHouseAdmin.title,
										context.inHouseAdmin.firstname,
										context.inHouseAdmin.lastname,
									]
										.filter(Boolean)
										.join(' ')}
								</H4>
							)}
							buttonLeft={() => <InHouseAdminButton />}
							buttonRight={() => (
								<RemoveButton title={i18n.preview.buttons.two} />
							)}
						/>
						<CardContentSwitch />
					</Flex>
				);
			}}
		</InHouseAdminProvider>
	);
};
