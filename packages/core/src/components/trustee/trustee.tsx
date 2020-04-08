import React from 'react';
import { StyledCard, StyledCardToolbar } from './components/card';
import { TrusteeProvider, useTrusteeContext, TrusteeProps } from './context';
import { Flex } from '../layout';
import { Text, H4 } from '../typography';
import { Button } from './components/button';
import Preview from './views/preview';
import Name from './views/name';
import Type from './views/type';
import Address from './views/address';
import Contacts from './views/contacts';
import RemoveReason from './views/remove/reason';
import RemoveConfirm from './views/remove/confirm';

// TODO: make responsive. Should contain 1 column on small screens and 2 on larger screens.

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
			{({ current: { context, matches }, send }) => (
				<StyledCard data-testid={props.testId} complete={context.complete}>
					<StyledCardToolbar>
						<Flex width="100%" flexDirection="column" mr="40px" p={[2]}>
							<Button
								onClick={() => send('EDIT_TRUSTEE')}
								disabled={!matches('preview')}
							>
								Trustee {'>'}
							</Button>
							<Flex mt={0} flexDirection="column">
								<H4 fontWeight="bold">
									{[context.title, context.forename, context.surname]
										.filter(Boolean)
										.join(' ')}
								</H4>
								{context.trusteeType && (
									<Text>
										{`${context.trusteeType[0].toUpperCase()}${context.trusteeType
											.slice(1)
											.toLowerCase()} trustee`}
									</Text>
								)}
							</Flex>
						</Flex>
						<Flex width="100%" justifyContent="flex-end" p={[null, 2]}>
							{context.complete ? 'No issues' : 'Incomplete'} |{' '}
							<Flex width="80px">
								<Button
									onClick={() => send('REMOVE')}
									disabled={!matches('preview')}
								>
									Remove {'>'}
								</Button>
							</Flex>
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
