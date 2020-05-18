import React from 'react';
import { Flex, P, H4 } from '@tpr/core';
import { useTrusteeContext } from '../../context';
import { Link } from '@tpr/core';
import { StyledCardToolbar } from '../../components/card';

const Preview: React.FC = () => {
	const { current, send, onCorrect } = useTrusteeContext();
	const { trustee, complete } = current.context;

	return (
		<Flex cfg={{ flex: '1 1 auto', flexDirection: 'column' }}>
			<StyledCardToolbar>
				<Flex cfg={{ width: 10, flex: '1 1 auto', flexDirection: 'column' }}>
					<Link underline onClick={() => send('EDIT_ORG')}>
						Correspondence address
					</Link>
					<Flex cfg={{ mt: 1, flexDirection: 'column' }}>
						<H4>{trustee.address.addressLine1}</H4>
						<P>{trustee.address.addressLine2}</P>
						<P>{trustee.address.addressLine3}</P>
						<P>{trustee.address.postTown}</P>
						<P>{trustee.address.postcode}</P>
					</Flex>
				</Flex>
				<Flex cfg={{ width: 10, flex: '1 1 auto', flexDirection: 'column' }}>
					<Link underline onClick={() => send('EDIT_CONTACTS')}>
						Contact details
					</Link>
					<Flex cfg={{ mt: 1, flexDirection: 'column' }}>
						<H4>Phone</H4>
						<P>{trustee.telephoneNumber}</P>
						<H4>Email</H4>
						<P>{trustee.emailAddress}</P>
					</Flex>
				</Flex>
			</StyledCardToolbar>
			<Flex
				cfg={{ flex: '0 0 auto', justifyContent: 'flex-start', mt: 1, pt: 3 }}
				// borderTop="1px solid #eee"
			>
				{/* <Checkbox
					value={complete}
					checked={complete}
					onChange={() => {
						send('COMPLETE', { value: !complete });
						onCorrect(!complete);
					}}
					label="All details are correct"
				/> */}
			</Flex>
		</Flex>
	);
};

export default Preview;
