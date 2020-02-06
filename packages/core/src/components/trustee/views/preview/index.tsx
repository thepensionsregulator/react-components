import React from 'react';
import { Flex } from '../../../layout';
import { Text } from '../../../typography';
import { useTrusteeContext } from '../../context';
import { Checkbox } from '@tpr/forms';
import { Button } from '../../components/button';

const Preview: React.FC = () => {
	const { current, send } = useTrusteeContext();
	const { company, contact } = current.context;
	return (
		<Flex flex="1 1 auto" flexDirection="column">
			<Flex flex="1 1 auto" justifyContent="space-evenly" mt={0}>
				<Flex width="100%" flexDirection="column" mr="20px">
					<Button onClick={() => send('EDIT_ORG')}>
						Correspondance address >
					</Button>
					<Flex mt={0} flexDirection="column">
						<Text>{company.name}</Text>
						<Text>{company.line1}</Text>
						<Text>{company.line2}</Text>
						<Text>{company.city}</Text>
						<Text>{company.county}</Text>
						<Text>{company.postCode}</Text>
					</Flex>
				</Flex>
				<Flex width="100%" flexDirection="column">
					<Button onClick={() => send('EDIT_CONTACTS')}>
						Contact details >
					</Button>
					<Flex mt={0} flexDirection="column">
						<Text>Phone</Text>
						<Text>{contact.phoneNumber}</Text>
						<Text>Email</Text>
						<Text>{contact.emailAddress}</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex
				flex="0 0 auto"
				justifyContent="flex-start"
				borderTop="1px solid #eee"
				mt={0}
				pt={2}
			>
				<Checkbox
					input={{ value: true }}
					onChange={input => !input.value}
					label="All details are correct"
					disabled
				/>
			</Flex>
		</Flex>
	);
};

export default Preview;
