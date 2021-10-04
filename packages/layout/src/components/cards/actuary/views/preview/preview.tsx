import React, { useRef } from 'react';
import { Checkbox } from '@tpr/forms';
import { Flex, Hr, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { useActuaryContext } from '../../context';
import {
	AddressPreview,
	ContactDetailsPreview,
	CompaniesHouseNumber,
} from '../../../common/views/preview/components';
import { concatenateStrings } from '../../../../../utils';
import styles from '../../../cards.module.scss';

export const Preview: React.FC<any> = React.memo(() => {
	const { current, send, onCorrect, i18n } = useActuaryContext();
	const { actuary, complete, preValidatedData } = current.context;

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
				{/* Address section: display only	 */}
				<Flex cfg={{ pr: 4 }} className={styles.section}>
					<UnderlinedButton>{i18n.preview.buttons.three}</UnderlinedButton>
					<AddressPreview
						address={{
							addressLine1: actuary.address.addressLine1,
							addressLine2: actuary.address.addressLine2,
							addressLine3: actuary.address.addressLine3,
							postTown: actuary.address.postTown,
							county: actuary.address.county,
							postcode: actuary.address.postcode,
							country: actuary.address.country,
						}}
					/>

					{/* Companies House Number: display only	 */}
					<CompaniesHouseNumber
						heading={i18n.preview.buttons.four}
						companiesHouseNumber={actuary.companiesHouseNumber}
					/>
				</Flex>

				{/* Contact details section: open for editing	 */}
				<Flex cfg={{ pl: 4 }} className={styles.section}>
					<UnderlinedButton
						onClick={() => send('EDIT_CONTACTS')}
						isOpen={current.matches({ edit: 'contacts' })}
						isEditButton={true}
						buttonRef={contactsBtn}
						giveFocus={current.context.lastBtnClicked === 4}
					>
						{i18n.preview.buttons.five}
					</UnderlinedButton>
					<ContactDetailsPreview
						phone={{ value: actuary.telephoneNumber }}
						email={{ value: actuary.emailAddress }}
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
							actuary.title,
							actuary.firstName,
							actuary.lastName,
						]),
					)}
				/>
			</Flex>
		</div>
	);
});
