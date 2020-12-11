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
import { RemoveDateForm } from './views/remove/date/date';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import Address from '../common/views/address/addressPage';
import { NameScreen } from './views/name';
import RemovedBox from '../components/removedBox';
import { cardType, cardTypeName } from '../common/interfaces';
import styles from '../cards.module.scss';

const CardContentSwitch: React.FC = () => {
	const { current, i18n, send, addressAPI, onSaveAddress } = useInHouseAdminContext();
	const { inHouseAdmin } = current.context;

	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches({ edit: 'address' }):
			return <Address 
				onSubmit={async (values) => {
					try {
						const { address, ...inHouseAdminValues } = current.context.inHouseAdmin;
						await onSaveAddress(values, Object.assign(inHouseAdminValues, address));
						send('SAVE', { values });
					} catch (error) {
						console.log(error);
					}
				}}
				initialValue={inHouseAdmin.address}
				addressAPI={addressAPI}
				cardType={cardType.inHouseAdmin}
				cardTypeName={cardTypeName.inHouseAdmin}
				i18n={i18n.address}
			/>;
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
			return <RemovedBox type={cardTypeName.inHouseAdmin} />;
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

export const InHouseCard: React.FC<InHouseAdminProviderProps> = ({
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
							complete={context.preValidatedData ? true : context.complete}
							subtitle={() => (
								<H4 cfg={{ lineHeight: 3 }}>
									{[
										context.inHouseAdmin.title,
										context.inHouseAdmin.firstName,
										context.inHouseAdmin.lastName,
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
