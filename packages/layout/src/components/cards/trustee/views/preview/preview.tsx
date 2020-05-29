import React from 'react';
import { Flex, P, H4, Hr, classNames } from '@tpr/core';
import { useTrusteeContext } from '../../context';
import { UnderlinedButton } from '../../../components/button';
import { Checkbox } from '@tpr/forms';
import styles from './preview.module.scss';

export const Preview: React.FC = () => {
	const { current, send, onCorrect } = useTrusteeContext();
	const { trustee, complete } = current.context;

	return (
		<div
			className={classNames([{ [styles.complete]: complete }, styles.content])}
		>
			<P cfg={{ mb: 4 }}>Member-nominated trustee</P>
			<Flex>
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pr: 4 }}
				>
					<UnderlinedButton onClick={() => send('EDIT_ORG')}>
						Correspondence address
					</UnderlinedButton>
					<Flex cfg={{ mt: 1, flexDirection: 'column' }}>
						<H4>{trustee.address.addressLine1}</H4>
						<P>{trustee.address.addressLine2}</P>
						<P>{trustee.address.addressLine3}</P>
						<P>{trustee.address.postTown}</P>
						<P>{trustee.address.postcode}</P>
					</Flex>
				</Flex>
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pl: 4 }}
				>
					<UnderlinedButton onClick={() => send('EDIT_CONTACTS')}>
						Contact details
					</UnderlinedButton>
					<Flex cfg={{ mt: 1, flexDirection: 'column' }}>
						<H4>Phone</H4>
						<P>{trustee.telephoneNumber}</P>
						<H4>Email</H4>
						<P>{trustee.emailAddress}</P>
					</Flex>
				</Flex>
			</Flex>
			<Flex cfg={{ flexDirection: 'column' }}>
				<Hr cfg={{ my: 4 }} />
				<Checkbox
					value={complete}
					checked={complete}
					onChange={() => {
						send('COMPLETE', { value: !complete });
						onCorrect(!complete);
					}}
					label="All details are correct."
				/>
			</Flex>
		</div>
	);
};
