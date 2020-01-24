import React from 'react';
import { StyledCard, StyledCardToolbar } from './components/card';
import { TrusteeProvider, useTrusteeContext, TrusteeProps } from './context';
import { Flex } from '../layout';

// NOTE: each view should hold its own Form with state, and in the end it should sync state with *state machine*
// otherwise submit wont work and might be bad for Accessibility

const TrusteeBody: React.FC = () => {
	const { current } = useTrusteeContext();
	if (current.matches('preview')) {
		return <div>preview</div>;
	} else if (current.matches({ edit: 'trusteeName' })) {
		return <div>edit.trusteeName</div>;
	} else if (current.matches({ edit: 'trusteeType' })) {
		return <div>edit.trusteeType</div>;
	} else if (current.matches({ edit: 'trusteeWork' })) {
		return <div>edit.trusteeWork</div>;
	} else if (current.matches({ edit: 'trusteeCompanyDetails' })) {
		return <div>edit.trusteeCompanyDetails</div>;
	} else if (current.matches({ edit: 'trusteeContacts' })) {
		return <div>edit.trusteeContacts</div>;
	} else if (current.matches({ remove: 'reason' })) {
		return <div>remove.reason</div>;
	} else if (current.matches({ remove: 'confirm' })) {
		return <div>remove.confirm</div>;
	} else {
		return null;
	}
};

export const Trustee: React.FC<Omit<TrusteeProps, 'children'>> = ({ trustee }) => {
	return (
		<TrusteeProvider trustee={trustee}>
			{({ current: { context } }) => (
				<StyledCard complete={context.complete}>
					<StyledCardToolbar>
						<div>{`${context.trustee.firstName} ${context.trustee.lastName}`}</div>
						<div>{context.complete ? 'No issues' : 'Incomplete'} | Remove</div>
					</StyledCardToolbar>
					<Flex p="0 20px 20px 20px">
						<TrusteeBody />
					</Flex>
				</StyledCard>
			)}
		</TrusteeProvider>
	);
};
