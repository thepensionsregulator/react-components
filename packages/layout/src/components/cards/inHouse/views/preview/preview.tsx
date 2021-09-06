import React, { useRef } from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, Hr, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useInHouseAdminContext } from '../../context';
import {
	ContactDetailsPreview,
	AddressPreview,
} from '../../../common/views/preview/components';
import { concatenateStrings } from '../../../../../utils';
import styles from '../../../cards.module.scss';

export const Preview: React.FC<any> = React.memo(() => {
	const { current, send, onCorrect, i18n } = useInHouseAdminContext();
	const { inHouseAdmin, complete, preValidatedData } = current.context;

	const addressBtn = useRef(null);
	const contactsBtn = useRef(null);

	return (
		<div
			className={
				preValidatedData
					? classNames([styles.content, styles.complete])
					: classNames([{ [styles.complete]: complete }, styles.content])
			}
		>
			<Flex>
				{/* Addres section: open for editing	 */}
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pr: 4 }}
				>
					<UnderlinedButton
						onClick={() => send('EDIT_ADDRESS')}
						isEditButton={true}
						buttonRef={addressBtn}
						giveFocus={current.context.lastBtnClicked === 3}
					>
						{i18n.preview.buttons.three}
					</UnderlinedButton>
					<AddressPreview
						address={{
							addressLine1: inHouseAdmin.address.addressLine1,
							addressLine2: inHouseAdmin.address.addressLine2,
							addressLine3: inHouseAdmin.address.addressLine3,
							postTown: inHouseAdmin.address.postTown,
							county: inHouseAdmin.address.county,
							postcode: inHouseAdmin.address.postcode,
							country: inHouseAdmin.address.country,
						}}
					/>
				</Flex>

				{/* Contact details section: open for editing	 */}
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pl: 4 }}
				>
					<UnderlinedButton
						onClick={() => send('EDIT_CONTACTS')}
						isEditButton={true}
						buttonRef={contactsBtn}
						giveFocus={current.context.lastBtnClicked === 4}
					>
						{i18n.preview.buttons.four}
					</UnderlinedButton>
					<ContactDetailsPreview
						phone={{ value: inHouseAdmin.telephoneNumber }}
						email={{ value: inHouseAdmin.emailAddress }}
					/>
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
					label={i18n.preview.checkboxLabel.replace(
						'__NAME__',
						concatenateStrings([
							inHouseAdmin.title,
							inHouseAdmin.firstName,
							inHouseAdmin.lastName,
						]),
					)}
				/>
			</Flex>
		</div>
	);
});
