import React from 'react';
import { Flex } from '../../../layout';
import { P } from '../../../typography';
import { useTrusteeContext } from '../../context';
import { Checkbox } from '@tpr/forms';
import { Button } from '../../components/button';

const Preview: React.FC = () => {
	const { current, send } = useTrusteeContext();
	const { company, contact } = current.context;
	return (
		<Flex flex="1 1 auto" flexDirection="column">
			<Flex
				flex="1 1 auto"
				justifyContent="space-evenly"
				border="1px dashed grey"
				mt={0}
			>
				<Flex width="100%" flexDirection="column" borderRight="1px solid grey">
					<Button onClick={() => send('EDIT_ORG')}>
						Correspondance address >
					</Button>
					<ul>
						<li>{company.name}</li>
						<li>{company.line1}</li>
						<li>{company.line2}</li>
						<li>{company.city}</li>
						<li>{company.county}</li>
						<li>{company.postCode}</li>
					</ul>
				</Flex>
				<Flex width="100%" flexDirection="column">
					<Button onClick={() => send('EDIT_CONTACTS')}>
						Contact details >
					</Button>
					<ul>
						<li>
							<P>Phone</P>
						</li>
						<li>{contact.phoneNumber}</li>
					</ul>
					<ul>
						<li>
							<P>Email</P>
						</li>
						<li>{contact.emailAddress}</li>
					</ul>
				</Flex>
			</Flex>
			<Flex flex="0 0 auto" justifyContent="flex-start" mt={2}>
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
