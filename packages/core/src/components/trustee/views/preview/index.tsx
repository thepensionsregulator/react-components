import React from 'react';
import { Flex } from '../../../layout';
import { H2, P } from '../../../typography';
import { Footer } from '../../components/card';
import { useTrusteeContext } from '../../context';

const Preview: React.FC = () => {
	const { current } = useTrusteeContext();
	const { company, contact } = current.context;
	return (
		<Flex flex="1 1 auto" flexDirection="column">
			<Flex
				flex="1 1 auto"
				justifyContent="space-evenly"
				border="1px dashed grey"
				mt={0}
			>
				<Flex width="100%" flexDirection="column">
					<H2>Correspondance address</H2>
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
					<H2>Contact details</H2>
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
			<Footer onContinue={() => {}} onSave={() => {}} />
		</Flex>
	);
};

export default Preview;
