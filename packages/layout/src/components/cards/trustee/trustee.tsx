import React from 'react';
import {
	TrusteeProvider,
	useTrusteeContext,
	TrusteeCardProps,
} from './context';
import { H4, Flex } from '@tpr/core';
import { UnderlinedButton } from '../components/button';
import { Preview } from './views/preview';
import { Toolbar } from '../components/toolbar';
import Name from './views/name';
import Type from './views/type/type';
import Address from '../common/views/address/addressPage';
import { Contacts } from './views/contacts';
import RemoveReason from './views/remove/reason/reason';
import { ConfirmRemove } from './views/remove/confirm';
import RemovedBox from '../components/removedBox';
import { cardType, cardTypeName } from '../common/interfaces';

import styles from '../cards.module.scss';
import AddressComparer from '@tpr/forms/lib/elements/address/addressComparer';
import { TrusteeContext } from './trusteeMachine';

const CardContent: React.FC = () => {
	const { current, i18n, send, addressAPI } = useTrusteeContext();
	const { trustee } = current.context;

	if (current.matches('preview')) {
		return <Preview />;
	} else if (current.matches({ edit: { trustee: 'name' } })) {
		return <Name />;
	} else if (
		current.matches({ edit: { trustee: 'kind' } }) ||
		current.matches({ edit: { trustee: 'save' } })
	) {
		return <Type />;
	} else if (
		current.matches({ edit: { company: 'address' } }) ||
		current.matches({ edit: { company: 'save' } })
	) {
		return (
			<Address
				onSubmit={(values) => {
					const comparer = new AddressComparer();
					if (comparer.areEqual(values.initialValue, values)) {
						send('CANCEL');
					} else {
						send('SAVE', { address: values || {} });
					}
				}}
				initialValue={trustee.address}
				addressAPI={addressAPI}
				cardType={cardType.trustee}
				cardTypeName={cardTypeName.trustee}
				i18n={i18n.address}
			/>
		);
	} else if (
		current.matches({ edit: { contact: 'details' } }) ||
		current.matches({ edit: { contact: 'save' } })
	) {
		return <Contacts />;
	} else if (current.matches({ remove: 'reason' })) {
		return <RemoveReason />;
	} else if (current.matches({ remove: 'confirm' })) {
		return <ConfirmRemove />;
	} else if (current.matches({ remove: 'deleted' })) {
		// message to show when successfuly deleted.
		return <RemovedBox type={cardTypeName.trustee} />;
	} else {
		return null;
	}
};

const TrusteeButton: React.FC = () => {
	const { current, send, i18n } = useTrusteeContext();

	return (
		<UnderlinedButton
			isOpen={
				current.matches({ edit: { trustee: 'name' } }) ||
				current.matches({ edit: { trustee: 'kind' } }) ||
				current.matches({ edit: { trustee: 'save' } }) ||
				current.matches({ edit: { company: 'address' } }) ||
				current.matches({ edit: { company: 'save' } }) ||
				current.matches({ edit: { contact: 'details' } }) ||
				current.matches({ edit: { contact: 'save' } }) ||
				current.matches({ remove: 'reason' }) ||
				current.matches({ remove: 'confirm' })
			}
			onClick={() => {
				if (
					current.matches({ edit: { trustee: 'name' } }) ||
					current.matches({ edit: { trustee: 'kind' } }) ||
					current.matches({ edit: { company: 'address' } }) ||
					current.matches({ edit: { contact: 'details' } }) ||
					current.matches({ remove: 'reason' }) ||
					current.matches({ remove: 'confirm' })
				) {
					send('CANCEL');
				} else {
					send('EDIT_TRUSTEE');
				}
			}}
		>
			{i18n.preview.buttons.one}
		</UnderlinedButton>
	);
};

const RemoveButton: React.FC = () => {
	const { current, send, i18n } = useTrusteeContext();

	return (
		<UnderlinedButton
			isOpen={
				current.matches({ remove: 'reason' }) ||
				current.matches({ remove: 'confirm' })
			}
			onClick={() => {
				if (
					current.matches({ remove: 'reason' }) ||
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

const isComplete = (context: TrusteeContext) => {
	return context.preValidatedData ? true : context.complete;
};

export const TrusteeCard: React.FC<Omit<TrusteeCardProps, 'children'>> = ({
	cfg,
	...props
}) => {
	return (
		<TrusteeProvider {...props}>
			{({ current, i18n }) => (
				<Flex cfg={cfg} data-testid={props.testId} className={styles.card}>
					<Toolbar
						complete={isComplete(current.context)}
						buttonLeft={() => <TrusteeButton />}
						buttonRight={() => <RemoveButton />}
						subtitle={() => (
							<H4 cfg={{ lineHeight: 3 }}>
								{[
									current.context.trustee.title,
									current.context.trustee.firstName,
									current.context.trustee.lastName,
								]
									.filter(Boolean)
									.join(' ')}
							</H4>
						)}
						statusText={
							isComplete(current.context)
								? i18n.preview.statusText.confirmed
								: i18n.preview.statusText.unconfirmed
						}
					/>
					<CardContent />
				</Flex>
			)}
		</TrusteeProvider>
	);
};
