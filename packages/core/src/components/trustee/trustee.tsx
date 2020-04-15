import React from 'react';
import { StyledCard, StyledCardToolbar } from './components/card';
import { TrusteeProvider, useTrusteeContext, TrusteeProps } from './context';
import { Flex } from '../layout';
import { Text, H4, P } from '../typography';
import { Button } from './components/button';
import { CheckedCircle, ErrorCircle } from '@tpr/icons';
import Preview from './views/preview';
import Name from './views/name';
import Type from './views/type';
import Address from './views/address';
import Contacts from './views/contacts';
import RemoveReason from './views/remove/reason';
import RemoveConfirm from './views/remove/confirm';
import { useTheme } from 'styled-components';

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
	const { colors }: any = useTheme();
	return (
		<Flex alignItems="center" height="22px">
			<Icon size={18} fill={colors[complete ? 'success' : 'danger'][200]} />
			<P ml={0} fontSize={1} color={complete ? 'success.200' : 'danger.200'}>
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
						<Flex width="100%" flexDirection="column" mr="40px" p={[2]}>
							<Button
								onClick={() => send('EDIT_TRUSTEE')}
								disabled={!matches('preview')}
							>
								Trustee {'>'}
							</Button>
							<Flex mt={0} flexDirection="column">
								<H4 fontWeight="bold">
									{[
										context.trustee.title,
										context.trustee.forename,
										context.trustee.surname,
									]
										.filter(Boolean)
										.join(' ')}
								</H4>
								{context.trustee.trusteeType && (
									<Text>
										{`${context.trustee.trusteeType[0].toUpperCase()}${context.trustee.trusteeType
											.slice(1)
											.toLowerCase()} trustee`}
									</Text>
								)}
							</Flex>
						</Flex>
						<Flex width="100%" justifyContent="flex-end" p={[null, 2]}>
							{context.complete ? (
								<StatusMessage
									complete={context.complete}
									icon={CheckedCircle}
								/>
							) : (
								<StatusMessage complete={context.complete} icon={ErrorCircle} />
							)}
							<Flex
								width="84px"
								ml={1}
								pl={1}
								borderLeft="1px solid"
								borderColor="neutral.200"
							>
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
