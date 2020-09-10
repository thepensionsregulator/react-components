import React from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, P, Hr, H4, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useInHouseAdminContext } from '../../context';
import styles from './preview.module.scss';

export const Preview: React.FC<any> = () => {
	const { current, send, onCorrect, i18n } = useInHouseAdminContext();
	const { inHouseAdmin, complete } = current.context;

	return (
		<div
			className={classNames([{ [styles.complete]: complete }, styles.content])}
		>
			<Flex>
				{/* Addres section: open for editing	 */}
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pr: 4 }}
				>
					<UnderlinedButton onClick={() => send('EDIT_ADDRESS')}>
						{i18n.preview.buttons.three}
					</UnderlinedButton>
					<Flex cfg={{ my: 2, flexDirection: 'column' }}>
						<P>{inHouseAdmin.address.addressLine1}</P>
						{inHouseAdmin.address.addressLine2 && (
							<P>{inHouseAdmin.address.addressLine2}</P>
						)}
						{inHouseAdmin.address.addressLine3 && (
							<P>{inHouseAdmin.address.addressLine3}</P>
						)}
						<P>{inHouseAdmin.address.postTown}</P>
						{inHouseAdmin.address.county && (
							<P>{inHouseAdmin.address.county}</P>
						)}
						<P>{inHouseAdmin.address.postcode}</P>
						{inHouseAdmin.address.country && (
							<P>{inHouseAdmin.address.country}</P>
						)}
					</Flex>
				</Flex>

				{/* Contact details section: open for editing	 */}
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pl: 4 }}
				>
					<UnderlinedButton onClick={() => send('EDIT_CONTACTS')}>
						{i18n.preview.buttons.four}
					</UnderlinedButton>
					<Flex cfg={{ my: 2, flexDirection: 'column' }}>
						{inHouseAdmin.telephoneNumber && (
							<>
								<H4 cfg={{ lineHeight: 3 }}>Phone</H4>
								<P>{inHouseAdmin.telephoneNumber}</P>
							</>
						)}
						{inHouseAdmin.emailAddress && (
							<>
								<H4 cfg={{ lineHeight: 3 }}>Email</H4>
								<P cfg={{ wordBreak: 'all' }}>{inHouseAdmin.emailAddress}</P>
							</>
						)}
					</Flex>
				</Flex>
			</Flex>

			{/*  All details correct - Checkbox	 */}
			<Flex cfg={{ flexDirection: 'column' }}>
				<Hr cfg={{ my: 4 }} />
				<Checkbox
					value={complete}
					checked={complete}
					onChange={() => {
						send('COMPLETE', { value: !complete });
						onCorrect(!complete);
					}}
					label={i18n.preview.checkboxLabel}
				/>
			</Flex>
		</div>
	);
};
