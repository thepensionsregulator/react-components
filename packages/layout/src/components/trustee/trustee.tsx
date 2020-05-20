import React from 'react';
import { TrusteeProvider, useTrusteeContext, TrusteeProps } from './context';
import { Flex, H4, P, classNames } from '@tpr/core';
import { UnderlinedButton } from './components/button';
import { CheckedCircle, ErrorCircle } from '@tpr/icons';
import { Preview } from './views/preview';
import Name from './views/name';
import Type from './views/type/type';
import Address from './views/address';
import Contacts from './views/contacts';
import RemoveReason from './views/remove/reason';
import RemoveConfirm from './views/remove/confirm';

import styles from './trustee.module.scss';

// TODO: make responsive. Should contain 1 column on small screens and 2 on larger screens.

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

const StatusMessage = ({ complete, icon: Icon }) => {
	// colors[complete ? 'success' : 'danger'][200]
	return (
		<Flex cfg={{ alignItems: 'center' }} height="22px">
			<Icon size={18} fill={complete ? '#207e3b' : '#d4351c'} />
			<P
				cfg={{ ml: 1, fontSize: 2, color: complete ? 'success.2' : 'danger.2' }}
			>
				{complete ? 'No issues' : 'Incomplete'}
			</P>
		</Flex>
	);
};

export const Trustee: React.FC<Omit<TrusteeProps, 'children'>> = (props) => {
	return (
		<TrusteeProvider {...props}>
			{({ current: { context, matches }, send }) => (
				<div data-testid={props.testId} className={styles.card}>
					<div
						className={classNames([
							{ [styles.complete]: context.complete },
							styles.cardToolbar,
						])}
					>
						<Flex
							cfg={{
								width: 5,
								flex: '0 0 auto',
								flexDirection: 'column',
								justifyContent: 'flex-start',
								pr: 4,
							}}
						>
							<UnderlinedButton
								isOpen={
									matches({ edit: { trustee: 'name' } }) ||
									matches({ edit: { trustee: 'kind' } }) ||
									matches({ edit: { trustee: 'save' } }) ||
									matches({ edit: { company: 'address' } }) ||
									matches({ edit: { company: 'save' } }) ||
									matches({ edit: { contact: 'details' } }) ||
									matches({ edit: { contact: 'save' } })
								}
								onClick={() => {
									if (
										matches({ edit: { trustee: 'name' } }) ||
										matches({ edit: { trustee: 'kind' } }) ||
										matches({ edit: { company: 'address' } }) ||
										matches({ edit: { contact: 'details' } })
									) {
										send('CANCEL');
									} else {
										send('EDIT_TRUSTEE');
									}
								}}
							>
								Trustee
							</UnderlinedButton>
							<Flex cfg={{ mt: 1, flexDirection: 'column' }}>
								<H4>
									{[
										context.trustee.title,
										context.trustee.forename,
										context.trustee.surname,
									]
										.filter(Boolean)
										.join(' ')}
								</H4>
							</Flex>
						</Flex>
						<Flex
							cfg={{
								width: 5,
								flex: '0 0 auto',
								justifyContent: 'flex-end',
								alignItems: 'flex-start',
								pl: 4,
							}}
						>
							{context.complete ? (
								<StatusMessage
									complete={context.complete}
									icon={CheckedCircle}
								/>
							) : (
								<StatusMessage complete={context.complete} icon={ErrorCircle} />
							)}
							<div className={styles.verticalHr} />
							<Flex cfg={{ alignItems: 'flex-start' }}>
								<UnderlinedButton
									isOpen={
										matches({ remove: 'reason' }) ||
										matches({ remove: 'confirm' })
									}
									onClick={() => {
										if (
											matches({ remove: 'reason' }) ||
											matches({ remove: 'confirm' })
										) {
											send('CANCEL');
										} else {
											send('REMOVE');
										}
									}}
								>
									Remove
								</UnderlinedButton>
							</Flex>
						</Flex>
					</div>
					<CardContent />
				</div>
			)}
		</TrusteeProvider>
	);
};
