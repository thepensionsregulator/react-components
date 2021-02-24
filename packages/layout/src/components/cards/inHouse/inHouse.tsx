import React from 'react';
import {
	InHouseAdminProvider,
	InHouseAdminProviderProps,
	useInHouseAdminContext,
} from './context';
import { Flex, Span } from '@tpr/core';
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
import { AddressComparer } from '@tpr/forms';
import { InHouseAdminContext } from './inHouseMachine';
import { removeFromTabFlowIfMatches } from '../../../utils';

const CardContentSwitch: React.FC = () => {
	const {
		current,
		i18n,
		send,
		addressAPI,
		onSaveAddress,
	} = useInHouseAdminContext();
	const { inHouseAdmin } = current.context;

	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches({ edit: 'address' }):
			return (
				<Address
					onSubmit={async (values) => {
						try {
							const {
								address,
								...inHouseAdminValues
							} = current.context.inHouseAdmin;

							const comparer = new AddressComparer();
							if (comparer.areEqual(values.initialValue, values)) {
								send('CANCEL');
							} else {
								await onSaveAddress(
									values,
									Object.assign(inHouseAdminValues, address),
								);
								send('SAVE', { values });
							}
						} catch (error) {
							console.log(error);
						}
					}}
					initialValue={inHouseAdmin.address}
					addressAPI={addressAPI}
					cardType={cardType.inHouseAdmin}
					cardTypeName={cardTypeName.inHouseAdmin}
					sectionTitle={i18n.address.sectionTitle}
					i18n={i18n.address}
					onCancelChanges={() => send('CANCEL')}
				/>
			);
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

const RemoveButton: React.FC<{ title: string; tabIndex?: number }> = ({
	title,
	tabIndex,
}) => {
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
			tabIndex={tabIndex}
		>
			{title}
		</UnderlinedButton>
	);
};

const isComplete = (context: InHouseAdminContext) => {
	return context.preValidatedData ? true : context.complete;
};

export const InHouseCard: React.FC<InHouseAdminProviderProps> = ({
	testId,
	cfg,
	...rest
}) => {
	return (
		<InHouseAdminProvider {...rest}>
			{({ current, i18n }) => {
				return (
					<Flex cfg={cfg} data-testid={testId} className={styles.card}>
						<Toolbar
							complete={isComplete(current.context)}
							subtitle={() => (
								<Span cfg={{ lineHeight: 3 }} className={styles.styledAsH4}>
									{[
										current.context.inHouseAdmin.title,
										current.context.inHouseAdmin.firstName,
										current.context.inHouseAdmin.lastName,
									]
										.filter(Boolean)
										.join(' ')}
								</Span>
							)}
							statusText={
								isComplete(current.context)
									? i18n.preview.statusText.confirmed
									: i18n.preview.statusText.unconfirmed
							}
							buttonLeft={() => <InHouseAdminButton />}
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
					</Flex>
				);
			}}
		</InHouseAdminProvider>
	);
};
