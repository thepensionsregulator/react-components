import React from 'react';
import { StyledCard, StyledCardToolbar } from './components/card';
import { TrusteeProvider, useTrusteeContext, TrusteeProps } from './context';
import { Flex, H4, P } from '@tpr/core';
import { UnderlinedButton } from './components/button';
import { CheckedCircle, ErrorCircle, ArrowDown, ArrowUp } from '@tpr/icons';
import Preview from './views/preview';
import Name from './views/name';
import Type from './views/type';
import Address from './views/address';
import Contacts from './views/contacts';
import RemoveReason from './views/remove/reason';
import RemoveConfirm from './views/remove/confirm';

// TODO: make responsive. Should contain 1 column on small screens and 2 on larger screens.

const TrusteeBody: React.FC = () => {
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
		<Flex alignItems="center" height="22px">
			<Icon size={18} fill="red" />
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
				<StyledCard data-testid={props.testId} complete={context.complete}>
					<StyledCardToolbar>
						<Flex
							cfg={{ width: 10, flexDirection: 'column', mr: 6, pl: 3, py: 3 }}
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
								disabled={context.loading}
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
								{context.trustee.trusteeType && (
									<P>
										{`${context.trustee.trusteeType[0].toUpperCase()}${context.trustee.trusteeType
											.slice(1)
											.toLowerCase()} trustee`}
									</P>
								)}
							</Flex>
						</Flex>
						<Flex cfg={{ width: 10, justifyContent: 'flex-end', p: 3 }}>
							{context.complete ? (
								<StatusMessage
									complete={context.complete}
									icon={CheckedCircle}
								/>
							) : (
								<StatusMessage complete={context.complete} icon={ErrorCircle} />
							)}
							<Flex
								cfg={{ width: 2, ml: 2, pl: 2 }}
								// borderLeft="1px solid"
								// borderColor="neutral.200"
							>
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
									disabled={context.loading}
								>
									Remove
								</UnderlinedButton>
							</Flex>
						</Flex>
					</StyledCardToolbar>
					<Flex cfg={{ pr: 2, pb: 2, pl: 2 }}>
						<TrusteeBody />
					</Flex>
				</StyledCard>
			)}
		</TrusteeProvider>
	);
};
