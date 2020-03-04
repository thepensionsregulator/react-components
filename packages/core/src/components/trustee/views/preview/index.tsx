import React from 'react';
import { Flex } from '../../../layout';
import { Text, H4 } from '../../../typography';
import { useTrusteeContext } from '../../context';
import { Checkbox } from '@tpr/forms';
import { Button } from '../../components/button';
import { StyledCardToolbar } from '../../components/card';

const Preview: React.FC = () => {
	const { current, send } = useTrusteeContext();
	const { company, contact } = current.context;
	return (
		<Flex flex="1 1 auto" flexDirection="column">
			<StyledCardToolbar>
				<Flex
					width="100%"
					flex="1 1 auto"
					flexDirection="column"
					mr={[null, '40px']}
				>
					<Button onClick={() => send('EDIT_ORG')}>
						Correspondence address {'>'}
					</Button>
					<Flex mt={0} flexDirection="column">
						<H4 fontWeight="bold">{company.name}</H4>
						<Text>{company.line1}</Text>
						<Text>{company.line2}</Text>
						<Text>{company.city}</Text>
						<Text>{company.county}</Text>
						<Text>{company.postCode}</Text>
					</Flex>
				</Flex>
				<Flex width="100%" flex="1 1 auto" flexDirection="column">
					<Button onClick={() => send('EDIT_CONTACTS')}>
						Contact details {'>'}
					</Button>
					<Flex mt={0} flexDirection="column">
						<H4 fontWeight="bold">Phone</H4>
						<Text>{contact.phoneNumber}</Text>
						<H4 fontWeight="bold">Email</H4>
						<Text>{contact.emailAddress}</Text>
					</Flex>
				</Flex>
			</StyledCardToolbar>
			<Flex
				flex="0 0 auto"
				justifyContent="flex-start"
				borderTop="1px solid #eee"
				mt={0}
				pt={2}
			>
				<Checkbox
					checked={false}
					onChange={input => !input.value}
					label="All details are correct"
				/>
			</Flex>
		</Flex>
	);
};

export default Preview;
