import React, { useRef } from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, Hr, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useInHouseAdminContext } from '../../context';
import {
	ContactDetailsPreview,
	AddressPreview,
} from '../../../common/views/preview/components';
import styles from '../../../cards.module.scss';
import { concatenateStrings } from '../../../../../utils';

export const Preview: React.FC<any> = React.memo(() => {
	const { current, send, onCorrect, i18n } = useInHouseAdminContext();
	const { inHouseAdmin, complete, preValidatedData } = current.context;

	const addressBtn = useRef(null);
	const contactsBtn = useRef(null);

	const onClickAddressBtn = () => {
		current.context.lastBtnClicked = 3;
		send('EDIT_ADDRESS');
	};

	const onClickContactsBtn = () => {
		current.context.lastBtnClicked = 4;
		send('EDIT_CONTACTS');
	};

	const onCollapseAddress = () => {
		current.context.lastBtnClicked === 3 && addressBtn.current.focus();
	};

	const onCollapseContacts = () => {
		current.context.lastBtnClicked === 4 && contactsBtn.current.focus();
	};

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
						onClick={onClickAddressBtn}
						isOpen={current.matches({ edit: 'address' })}
						isEditButton={true}
						buttonRef={addressBtn}
						onCollapseCallback={onCollapseAddress}
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
						onClick={onClickContactsBtn}
						isOpen={current.matches({ edit: 'contacts' })}
						isEditButton={true}
						buttonRef={contactsBtn}
						onCollapseCallback={onCollapseContacts}
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
