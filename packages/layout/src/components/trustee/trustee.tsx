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
import RemoveReason from './views/remove/reason/reason';
import RemoveConfirm from './views/remove/confirm';

import styles from './trustee.module.scss';

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

const RemoveButton: React.FC = () => {
	const { current, send } = useTrusteeContext();
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

export const Trustee: React.FC<Omit<TrusteeProps, 'children'>> = (props) => {
	return (
		<TrusteeProvider {...props}>
			{({ current: { context } }) => (
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
							<TrusteeButton />
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
								<RemoveButton />
							</Flex>
						</Flex>
					</div>
					<CardContent />
				</div>
			)}
		</TrusteeProvider>
	);
};
