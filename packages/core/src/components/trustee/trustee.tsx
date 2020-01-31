import React from 'react';
import { StyledCard, StyledCardToolbar } from './components/card';
import { TrusteeProvider, useTrusteeContext, TrusteeProps } from './context';
import { Flex } from '../layout';
import { Button } from './components/button';
import Preview from './views/preview';
import Name from './views/name';
import Type from './views/type';
import Address from './views/address';
import Contacts from './views/contacts';
import RemoveReason from './views/remove/reason';
import RemoveConfirm from './views/remove/confirm';

// NOTE: each view should hold its own Form with state, and in the end it should sync state with *state machine*
// otherwise submit wont work and might be bad for Accessibility

const TrusteeBody: React.FC = () => {
	const { current } = useTrusteeContext();
	if (current.matches('preview')) {
		return <Preview />;
	} else if (current.matches({ edit: { trustee: 'name' } })) {
		return <Name />;
	} else if (current.matches({ edit: { trustee: 'type' } })) {
		return <Type />;
	} else if (current.matches({ edit: 'companyAddress' })) {
		return <Address />;
	} else if (current.matches({ edit: 'trusteeCompanyDetails' })) {
		return <div>edit.trusteeCompanyDetails</div>;
	} else if (current.matches({ edit: 'trusteeContacts' })) {
		return <Contacts />;
	} else if (current.matches({ remove: 'reason' })) {
		return <RemoveReason />;
	} else if (current.matches({ remove: 'confirm' })) {
		return <RemoveConfirm />;
	} else {
		return null;
	}
};

export const Trustee: React.FC<Omit<TrusteeProps, 'children'>> = props => {
	return (
		<TrusteeProvider {...props}>
			{({ current: { context }, send }) => (
				<StyledCard complete={context.complete}>
					<StyledCardToolbar>
						<Flex width="100%" flexDirection="column">
							<Button onClick={() => send('EDIT_TRUSTEE')}>Trustee ></Button>
							<div>{`${context.trustee.firstName} ${context.trustee.lastName}`}</div>
						</Flex>
						<Flex width="100%" justifyContent="flex-end">
							{context.complete ? 'No issues' : 'Incomplete'} |{' '}
							<button onClick={() => send('REMOVE')}>Remove</button>
						</Flex>
					</StyledCardToolbar>
					<Flex p="0 20px 20px 20px">
						<TrusteeBody />
					</Flex>
				</StyledCard>
			)}
		</TrusteeProvider>
	);
};
