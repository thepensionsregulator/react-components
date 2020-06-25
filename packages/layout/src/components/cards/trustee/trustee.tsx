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
import Address from './views/address';
import Contacts from './views/contacts';
import RemoveReason from './views/remove/reason/reason';
import RemoveConfirm from './views/remove/confirm';

import styles from '../cards.module.scss';

const CardContent: React.FC = () => {
	const { current } = useTrusteeContext();
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
		return <Address />;
	} else if (
		current.matches({ edit: { contact: 'details' } }) ||
		current.matches({ edit: { contact: 'save' } })
	) {
		return <Contacts />;
	} else if (current.matches({ remove: 'reason' })) {
		return <RemoveReason />;
	} else if (current.matches({ remove: 'confirm' })) {
		return <RemoveConfirm />;
	} else {
		return null;
	}
};

const TrusteeButton: React.FC = () => {
	const { current, send } = useTrusteeContext();

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
			Trustee
		</UnderlinedButton>
	);
};

const RemoveButton: React.FC<any> = ({ current, send }) => {
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
			Remove
		</UnderlinedButton>
	);
};

export const Trustee: React.FC<Omit<TrusteeCardProps, 'children'>> = ({
	cfg,
	...props
}) => {
	return (
		<TrusteeProvider {...props}>
			{({ current, send }) => (
				<Flex cfg={cfg} data-testid={props.testId} className={styles.card}>
					<Toolbar
						complete={current.context.complete}
						buttonLeft={() => <TrusteeButton />}
						buttonRight={() => <RemoveButton current={current} send={send} />}
						subtitle={() => (
							<H4 cfg={{ lineHeight: 3 }}>
								{[
									current.context.trustee.title,
									current.context.trustee.forename,
									current.context.trustee.surname,
								]
									.filter(Boolean)
									.join(' ')}
							</H4>
						)}
					/>
					<CardContent />
				</Flex>
			)}
		</TrusteeProvider>
	);
};
